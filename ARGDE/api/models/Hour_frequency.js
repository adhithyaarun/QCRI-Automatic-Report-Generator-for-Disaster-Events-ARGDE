module.exports = {
  connection: 'postgresServer',
  tableName: 'hour_frequency',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    date: {
      type:'datetime',
      columnName: 'date',
      allowNull:false,
    },
    hour: {
      type: 'string',
      columnType: 'time',
      columnName: 'hour',
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
