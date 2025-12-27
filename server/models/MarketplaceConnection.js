'use strict';

module.exports = (sequelize, DataTypes) => {
  const MarketplaceConnection = sequelize.define('MarketplaceConnection', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    shopId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'shop_id',
      references: {
        model: 'shops',
        key: 'id'
      }
    },
    marketplace: {
      type: DataTypes.ENUM('amazon', 'ebay', 'walmart', 'target', 'etsy', 'other'),
      allowNull: false
    },
    marketplaceAccountId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'marketplace_account_id'
    },
    credentials: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        autoSync: true,
        syncInventory: true,
        syncPrices: true,
        syncOrders: true
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'pending', 'error'),
      defaultValue: 'pending'
    },
    lastSyncAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_sync_at'
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'error_message'
    }
  }, {
    tableName: 'marketplace_connections',
    timestamps: true,
    underscored: true
  });

  MarketplaceConnection.associate = function(models) {
    MarketplaceConnection.belongsTo(models.Shop, {
      foreignKey: 'shop_id',
      as: 'shop'
    });
    MarketplaceConnection.hasMany(models.ProductListing, {
      foreignKey: 'connection_id',
      as: 'productListings'
    });
  };

  return MarketplaceConnection;
};
