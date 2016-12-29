import cars from '~/src/seeds/cars';

const TIMEOUT = 100;

export default {
  getCars: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cars) resolve(JSON.stringify(cars));
      reject('Cannot load cars');
    }, TIMEOUT);
  }),

  getOneCar: id => new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = cars.find(car => car.id === id);
      if (result) resolve(result);
      reject(`Car not found: ${id}`);
    }, TIMEOUT);
  })
};
