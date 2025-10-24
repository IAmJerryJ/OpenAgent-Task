import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface ContactAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactCreationAttributes
  extends Optional<
    ContactAttributes,
    "id" | "verified" | "createdAt" | "updatedAt"
  > {}

class Contact
  extends Model<ContactAttributes, ContactCreationAttributes>
  implements ContactAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;
  public note!: string;
  public verified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 20],
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default Contact;
