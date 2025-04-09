type FridgeItem = {
  food: string;
  expiration: Date;
  quantity: number | string;
  food_type: string;
  use_date?: Date | null;
  is_expired?: boolean;
};

export default FridgeItem;

export function fridgeItemMatches(
  item1: FridgeItem,
  item2: FridgeItem
): boolean {
  return (
    item1.food === item2.food &&
    item1.expiration.getDate() === item2.expiration.getDate() &&
    item1.use_date?.getDate() === item2.use_date?.getDate() &&
    item1.food_type === item2.food_type
  );
}

export function genItemKey(item: FridgeItem): string {
  return `${item.food}-${item.expiration.toISOString()}-${
    item.food_type
  }-${item.use_date?.toISOString()}`;
}
