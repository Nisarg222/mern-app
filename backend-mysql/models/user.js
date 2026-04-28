const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/dbInit");

class User extends Model {
  // Alias `id` → `_id` in JSON output to match the original MongoDB response shape
  toJSON() {
    const values = super.toJSON();
    values._id = values.id;
    return values;
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
