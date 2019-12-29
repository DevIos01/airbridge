import { lookupBaseID } from "./utils"

const whitelistInfo = {
  'Operations': {
    'Clubs': [
      'Name',
      'Slack Channel ID',
      'Leader Slack IDs',
      'Address City',
      'Address State',
      'Address Postal Code',
      'Address Country',
      'Club URL',
      'Latitude',
      'Longitude',
    ],
    'Badges': [
      'ID',
      'Name',
      'Emoji Tag',
      'Icon',
      'People Slack IDs'
    ]
  }
}

export function whitelistBaseTable(baseID, tableName) {
  const whitelistedBase = Object.keys(whitelistInfo).find(key => lookupBaseID(key) === lookupBaseID(baseID))
  console.log(whitelistedBase)
  if (!whitelistedBase) {
    throw "Base either doesn't exist or isn't publicly accessible"
  } else {
    console.log('Publicly accessing base', baseID)
  }

  const whitelistedTable = whitelistInfo[whitelistedBase][tableName]
  if (!whitelistedTable) {
    throw "Table either doesn't exist or isn't publicly accessible"
  } else {
    console.log('Publicly accessing table', tableName)
  }
  return whitelistedTable
}

export function whitelistRecords(records, whitelistedFields) {
  if (Array.isArray(records)) {
    return records.map(record => whitelistRecords(record, whitelistedFields))
  } else {
    console.log(whitelistedFields, records)
    const record = records
    const result = {
      id: record.id,
      fields: {}
    }

    whitelistedFields.forEach(field => result.fields[field] = record.fields[field])
    return result
  }
}