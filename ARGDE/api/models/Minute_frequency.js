module.exports = {
  connection: 'postgresServer',
  tableName: 'minute_frequency',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    date: {
      type:'datetime',
      columnType: 'date',
      columnName: 'date',
      allowNull:false,
    },
    hour: {
      type: 'integer',
      columnType: 'integer',
      columnName: 'hour',
      allowNull: false,
    },
    minute: {
      type: 'integer',
      columnType: 'integer',
      columnName: 'minute',
      allowNull: false,
    },
    frequency: {
      type: 'float',
      columnName: 'frequency',
      allowNull: false,
    },
    code: {
      type: 'string',
      columnName: 'code',
      allowNull: false,
    },
  },
};
