import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface ICheckProductStockDto {
  sku: string;

  min_stock: number;
}

export default class CheckProductStockDto {
  @IsString({
    message: "sku has invalid format",
  })
  @IsNotEmpty({
    message: "sku is required",
  })
  sku: string;

  @IsNumber(
    {},
    {
      message: "min_stock has invalid format",
    },
  )
  @IsNotEmpty({
    message: "min_stock is required",
  })
  min_stock: number;

  constructor(params: ICheckProductStockDto) {
    this.sku = params.sku;
    this.min_stock = params.min_stock;
  }
}
