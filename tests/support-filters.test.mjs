import test from 'node:test'
import assert from 'node:assert/strict'
import { filterSupportGroups, defaultPreferences } from '../src/components/support/filterSupportGroups.ts'
import { supportGroups, supportCategories } from '../src/data/supportGroups.ts'

const find = (topics = [], filters = {}) => filterSupportGroups(supportGroups, topics, { ...defaultPreferences, ...filters })
const ids = groups => groups.map(group => group.id)

test('default results include the full local directory and every requested topic has examples', () => {
  assert.equal(find().length, 12)
  for (const category of supportCategories) assert.ok(find([category.id]).length > 0)
})

test('multiple selected topics use union matching without duplicate listings', () => {
  const grief = ids(find(['grief']))
  const addiction = ids(find(['family-addiction']))
  assert.deepEqual(new Set(ids(find(['grief', 'family-addiction']))), new Set([...grief, ...addiction]))
  const overlap = ids(find(['violence', 'trauma-stress']))
  assert.equal(overlap.filter(id => id === 'youth-violence').length, 1)
})

test('age, meeting format, and topic filters combine and include hybrid meetings', () => {
  assert.deepEqual(ids(find(['family-addiction'], { age: '13-17', format: 'online' })), ['teen-family'])
  assert.deepEqual(ids(find(['family-addiction'], { age: '13-17', format: 'in-person' })), ['teen-family'])
  assert.deepEqual(ids(find(['family-addiction'], { age: '18-24', format: 'online' })), ['adult-family'])
  assert.deepEqual(ids(find(['grief'], { age: 'under-13', format: 'in-person' })), ['children-grief'])
  assert.deepEqual(ids(find(['family-addiction'], { age: 'under-13', format: 'online' })), ['children-family'])
  assert.ok(ids(find(['substance-recovery'], { age: '13-17' })).includes('teen-recovery'))
})

test('Duluth includes local and nationwide online samples but excludes other-region in-person samples', () => {
  assert.ok(ids(find(['separation'], { age: '18-24', location: 'anywhere' })).includes('adult-separation'))
  assert.deepEqual(find(['separation'], { age: '18-24', location: 'duluth' }), [])
  assert.ok(ids(find(['grief'], { age: '13-17', format: 'online', location: 'duluth' })).includes('teen-grief'))
})

test('a no-match combination remains empty without expanding user preferences', () => {
  assert.deepEqual(find(['violence'], { age: 'under-13', format: 'online' }), [])
})

test('all combinations satisfy every selected filter without mutating the directory', () => {
  const snapshot = JSON.stringify(supportGroups)
  const ranges = { 'under-13': [0, 12], '13-17': [13, 17], '18-24': [18, 24] }
  for (const category of supportCategories) for (const age of Object.keys(ranges)) {
    for (const format of ['either', 'online', 'in-person']) for (const location of ['anywhere', 'duluth']) {
      for (const group of find([category.id], { age, format, location })) {
        assert.ok(group.categories.includes(category.id))
        assert.ok(group.minAge <= ranges[age][1] && group.maxAge >= ranges[age][0])
        assert.ok(format === 'either' || group.format === 'hybrid' || group.format === format)
        assert.ok(location === 'anywhere' || group.coverage === 'duluth' || (group.coverage === 'national' && group.format !== 'in-person'))
      }
    }
  }
  assert.equal(JSON.stringify(supportGroups), snapshot)
})

test('fictional records have no real registration links or verification claims and minors have adult facilitation', () => {
  assert.equal(new Set(ids(supportGroups)).size, supportGroups.length)
  for (const group of supportGroups) {
    assert.equal(group.isDemo, true)
    assert.equal(group.verified, false)
    assert.equal(group.officialUrl, undefined)
    assert.equal(group.lastVerified, undefined)
    if (group.minAge < 18) assert.notEqual(group.facilitation, 'peer-led')
  }
})
