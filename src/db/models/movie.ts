import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("movies")
export class Movie {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  title!: string;

  @Field(TigrisDataTypes.INT64)
  year!: string;

  @Field({ elements: TigrisDataTypes.STRING })
  cast?: Array<string>;

  @Field()
  extract?: string;

  @Field({ elements: TigrisDataTypes.STRING })
  genres?: Array<string>;

  @Field()
  href?: string;

  @Field()
  thumbnail?: string;

  @Field(TigrisDataTypes.INT64)
  thumbnail_height?: string;

  @Field(TigrisDataTypes.INT64)
  thumbnail_width?: string;
}
