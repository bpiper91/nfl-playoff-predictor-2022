const { Schema, model, SchemaType } = require('mongoose');

const seasonSchema = new Schema(
    {
        year: {
          type: Number,
          required: true,
          unique: true,
          trim: true
        },
        afc: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        nfc: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        afcNorth,
        afcSouth,
        afcEast,
        afcWest,
        games: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game'
            }
        ]
    }
);