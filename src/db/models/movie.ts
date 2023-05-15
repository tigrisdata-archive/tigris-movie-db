import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("movies")
export class Movie {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  @SearchField({ sort: true })
  title!: string;

  @Field(TigrisDataTypes.INT64)
  @SearchField({ sort: true, facet: true })
  year!: string;

  @Field({ elements: TigrisDataTypes.STRING })
  cast?: Array<string>;

  @Field()
  @SearchField()
  extract?: string;

  @Field({ elements: TigrisDataTypes.STRING })
  @SearchField({ elements: TigrisDataTypes.STRING, facet: true })
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
