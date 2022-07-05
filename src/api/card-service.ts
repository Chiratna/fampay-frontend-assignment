// To parse this data:
//
//   import { Convert, Cards } from "./file";
//
//   const cards = Convert.toCards(json);

export interface Cards {
    card_groups: CardGroup[];
}

export interface CardGroup {
    id:            number;
    name:          string;
    design_type:   string;
    cards:         Card[];
    is_scrollable: boolean;
    height?:       number;
}

export interface Card {
    name:                   string;
    title?:                 string;
    formatted_title?:       FormattedTitle;
    description?:           string;
    formatted_description?: FormattedDescription;
    icon?:                  BgImage;
    url:                    string;
    bg_image?:              BgImage;
    bg_color?:              string;
    cta?:                   Cta[];
}

export interface BgImage {
    image_type:    ImageType;
    image_url:     string;
    aspect_ratio?: number;
}

export enum ImageType {
    EXT = "ext",
}

export interface Cta {
    text:       string;
    bg_color:   string;
    text_color: string;
    url:        string;
}

export interface FormattedDescription {
    text:     string;
    entities: Entity[];
}

export interface Entity {
    text:  string;
    color: string;
    url?: string;
    font_style? : string;
}

export interface FormattedTitle {
    text:     string;
    entities: Entity[];
    align?:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCards(json: string): Cards {
        // console.log("Inside covert",json);
        
        return JSON.parse(json);
    }

    public static cardsToJson(value: Cards): string {
        return JSON.stringify(value);
    }
}
