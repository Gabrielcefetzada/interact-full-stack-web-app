module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Posts.associete = (models) => {  
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        })
    }

    Posts.associete = (models) => {  
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }

    return Posts;
}