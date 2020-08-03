import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Product } from './product.model';

// const p1 = new Product('商品1', 100);
// console.log(p1.getInformation());

// p1をinstance化するのに使用するdata(ここではtitle: '商品1', price: 100)をserverから取得する場合、Productのinstanceして扱うにはmapでloopさせるなどの処理が必要になり面倒
const products = [
  { title: '商品1', price: 100 },
  { title: '商品2', price: 200 },
];
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// class-transformerなら簡単にあるclassのinstanceを得られる
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
