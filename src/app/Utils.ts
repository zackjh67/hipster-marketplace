declare let sandbox: any;

export class Utils {
  static formatItemListForSandbox(items: any[]): any[]{
    return items.map((item) => {
      return Utils.formatItemForSandbox(item);
    });
  }

  static formatItemForSandbox(item): any{
    return new sandbox.Item(
      item.id,
      item.salePrice || item.price,
      item.quantity,
      item.categories,
      !!item.salePrice,
      !!item.inventoryCount,
      item.price,
      item.color,
      item.brand,
      item.size,
      undefined,
      item.stars,
    );
  }
}
