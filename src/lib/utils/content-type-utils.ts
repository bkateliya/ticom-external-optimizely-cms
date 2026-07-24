import { ContentProps, ContentTypes } from "@optimizely/cms-sdk";
import { nanoid } from 'nanoid'

export interface GenericContentType {
  __typename: string;
}
export type ContentPropsWithId<T extends ContentTypes.AnyContentType> = ContentProps<T> & { _id: string }


type AnyContentType = ContentTypes.AnyContentType;
/**
 * Casts an unknown content type to the specified type.  To cast to 
 * @param array - The array of generic content to normalize
 * @param onlyOfType - Return null if item is not of specified type (Does not handle contracts)
 * @param T - The content type to normalize to
 * @returns ContentPropsWithId or null if onlyOfType is specified but the type doesn't match
 */
export function normalizeGenericContentToTyped<T extends AnyContentType>(
  item: GenericContentType | undefined | null): (ContentPropsWithId<T>);
export function normalizeGenericContentToTyped<T extends AnyContentType>(
  item: GenericContentType | undefined | null, onlyOfType?: T): (ContentPropsWithId<T> | null);
export function normalizeGenericContentToTyped<T extends AnyContentType>(
  item: GenericContentType | undefined | null, onlyOfType?: T): (ContentPropsWithId<T> | null) {

  if (!item || (onlyOfType && item?.__typename !== onlyOfType.key)) {
    return null;
  }
  const typedItem = item as unknown as ContentProps<T>;
  return {
    ...typedItem,
    // If there isn't an id, use a random id
    _id: typedItem._id ?? `random_${nanoid()}`,
  };
}

/**
 * Normalizes an array of generic content to an array of typed content with an id
 * @param array - The array of generic content to normalize
 * @param onlyOfType - Only includes item is of specified type (Does not handle contracts)
 * @param T - The content type to normalize to
 * @returns 
 */
export function normalizeGenericArrayToTyped<
  T extends ContentTypes.AnyContentType,
>(array: GenericContentType[] | undefined | null, onlyOfType?: T): (ContentProps<T> & { _id: string })[] {
  const typedArray =
    array?.map(item => normalizeGenericContentToTyped(item, onlyOfType)).filter(x => x != null) ?? [];
  return typedArray;
}
