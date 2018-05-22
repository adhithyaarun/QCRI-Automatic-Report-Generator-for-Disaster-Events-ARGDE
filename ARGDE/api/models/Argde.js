module.exports = {
  connection: 'postgresServer',
  tableName: 'twitter_data_feed',
  attributes: {
    id: {
      type: 'bigint',
      columnName: 'id',
      allowNull: false,
    },
    aidr: {
      type: 'json',
      columnName: 'aidr',
      allowNull: true,
    },
    code: {
      type: 'string',
      size: 64,
      columnName: 'code',
      allowNull: true,
    },
    createdAt:{
      type: 'datetime',
      columnName: 'created_at',
      allowNull: false,
    },
    feed: {
      type: 'json',
      columnName: 'feed',
      allowNull: true,
    },
    geo: {
      type: 'json',
      columnName: 'geo',
      allowNull: true,
    },
    place: {
      type: 'json',
      columnName: 'place',
      allowNull: true,
    },
    source: {
      type: 'string',
      size: 45,
      columnName: 'source',
      allowNull: true,
    },
    updatedAt: {
      type: 'dateTime',
      columnName: 'updated_at',
      allowNull: false,
    },
    tweet_id: {
      type: 'float',
      columnName: 'tweet_id',
      allowNull: true,
    },
    aidr_class_label: {
      type: 'string',
      columnName: 'aidr_class_label',
      allowNull: true,
    },
    aidr_class_label_conf: {
      type: 'float',
      columnName: 'aidr_class_label_conf',
      allowNull: true,
    },
    sentiment: {
      type: 'string',
      columnName: 'sentiment',
      allowNull: true,
    },
    sentiment_conf: {
      type: 'float',
      columnName: 'sentiment_conf',
      allowNull: true,
    },
    image_damage_class: {
      type: 'string',
      columnName: 'image_damage_class',
      allowNull: true,
    },
    image_damage_class_conf: {
      type: 'float',
      columnName: 'image_damage_class_conf',
      allowNull: true,
    },
    image_relevancy: {
      type: 'string',
      columnName: 'image_relevancy',
      allowNull: true,
    },
    image_relevancy_conf_score:{
      type: 'float',
      columnName: 'image_relevancy_conf_score',
      allowNull: true,
    },
    image_sensitive: {
      type: 'string',
      columnName: 'image_sensitive',
      allowNull: true,
    },
    image_sensitive_conf_score: {
      type: 'float',
      columnName: 'image_sensitive_conf_score',
      allowNull: true,
    },
    image_physical_location: {
      type: 'string',
      columnName: 'image_physical_location',
      allowNull: true,
    },
    image_url: {
      type: 'string',
      columnName: 'image_url',
      allowNull: true,
    },
    tweet_text: {
      type: 'string',
      columnName: 'tweet_text',
      allowNull: true,
    },
    latitude: {
      type: 'float',
      columnName: 'latitude',
      allowNull: true,
    },
    longitude: {
      type: 'float',
      columnName: 'longitude',
      allowNull: true,
    },
    place_name: {
      type: 'string',
      columnName: 'place_name',
      allowNull: true,
    },
    country_name: {
      type: 'string',
      columnName: 'country_name',
      allowNull: true,
    },
  }
};
