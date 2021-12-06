module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
        PostId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        UserId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    });
   
    return Likes;
  }; 