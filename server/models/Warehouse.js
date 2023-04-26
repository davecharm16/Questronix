module.exports = (sequelize , DataTypes)=>{
    const Warehouse = sequelize.define('Warehouse', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    });

    Warehouse.associate = (models) =>{
        Warehouse.hasMany(models.Products);
    }
    
    return Warehouse;
}