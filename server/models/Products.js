const Warehouse = require("./Warehouse");

module.exports = (sequelize, DataTypes) =>{
    const Products = sequelize.define('Products', {
        product_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        product_name: {
            type : DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        unit_price : {
            type : DataTypes.DECIMAL(10,2),
            allowNull : false,
        },
        manufacturer : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        date_arrived : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        date_manufactured : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        expiration_date : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        active : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        }
    });

    Products.associate = (models) =>{
        Products.belongsTo(models.Warehouse)
    }

    return Products;
}