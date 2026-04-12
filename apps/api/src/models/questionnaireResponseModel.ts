import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/db";
import User from "./userModel";
import { getIntegerType } from "../db/dataTypes";

/* -- Questionnaire Response Model -- */

// Interfaces

interface ResponseAttributes {
  id?: number;
  userId: number; // foreign key
  responses: Record<number, number | number[]>;
  totalScore?: number;
  currentQuestion?: number;
  /** Set when the user submits a full questionnaire (not on partial progress). */
  completedAt?: Date | null;
}

interface ResponseCreationAttributes
  extends Optional<
    ResponseAttributes,
    "id" | "currentQuestion" | "completedAt"
  > {}

/* -- QuestionnaireResponse Model Definition -- */
class QuestionnaireResponse
  extends Model<ResponseAttributes, ResponseCreationAttributes>
  implements ResponseAttributes
{
  // Define the attributes
  public id!: number;
  public userId!: number;
  public responses!: Record<number, number | number[]>;
  public totalScore!: number;
  public currentQuestion!: number;
  public completedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/* -- Initialize the QuestionnaireResponse model -- */
QuestionnaireResponse.init(
  {
    id: {
      type: getIntegerType(true),
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: getIntegerType(true),
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    responses: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalScore: {
      type: getIntegerType(),
      allowNull: true,
      defaultValue: 0,
    },
    currentQuestion: {
      type: getIntegerType(),
      allowNull: true,
      defaultValue: 0,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "questionnaire_responses",
    timestamps: true,
    underscored: false,
  }
);

/* -- Associations -- */

// A user has one questionnaire response
User.hasOne(QuestionnaireResponse, { foreignKey: "userId", as: "responses" });

// A questionnaire response belongs to a user
QuestionnaireResponse.belongsTo(User, { foreignKey: "userId" });

export default QuestionnaireResponse;
