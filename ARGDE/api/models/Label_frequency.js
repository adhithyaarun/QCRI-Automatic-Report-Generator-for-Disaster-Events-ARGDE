module.exports = {
  connection: 'postgresServer',
  tableName: 'label_frequency',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    date: {
      type: 'datetime',
      columnType: 'date',
      columnName: 'date',
      allowNull: false,
    },
    hour: {
      type: 'string',
      columnType: 'time',
      columnName: 'hour',
      allowNull: false,
    },
    minute: {
      type: 'integer',
      columnType: 'integer',
      columnName: 'minute',
      allowNull: false,
    },
    day: {
      type: 'bigint',
      columnType: 'bigint',
      columnName: 'day',
      allowNull: false,
    },
    class_label: {
      type: 'string',
      columnType: 'character varying',
      columnName: 'class_label',
      allowNull: false,
    },
    frequency: {
      type: 'bigint',
      columnType: 'bigint',
      columnName: 'frequency',
      allowNull: false,
    },
    code: {
      type: 'string',
      columnType: 'character varying',
      columnName: 'code',
      allowNull: false,
    },
  }
};
