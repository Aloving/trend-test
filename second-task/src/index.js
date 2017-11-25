import { startTransformer } from './helpers';
import Model from './model';
import View from './view';
import Controller from './controller';

const { data } = require('./data.json');

const transformedArray = startTransformer(data);
const model = new Model(transformedArray);
const view = new View(transformedArray);
const controller = new Controller(model, view);

export default controller;
