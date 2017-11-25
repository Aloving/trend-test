import shortId from 'shortid';


/**
 * startTransformer - Первоначальная обработка данных
 * Функция преобразует данные в нужный вид
 *
 * @param  {Object[]} sourceArray Исходный массив
 * @return {Object[]}                 Преобразованный массив
 */
function startTransformer(sourceArray) {
  const transformedArray = sourceArray.reduce((result, current) => {
    current.blocks.forEach((block) => {
      const { builderName, builderAdverticement } = current;
      const { blockName, blockPlanPercent } = block;

      result.push({
        id: shortId.generate(),
        builderName,
        blockName,
        blockPlanPercent,
        builderAdverticement,
      });
    });

    return result;
  }, []);

  return transformedArray;
}

export default startTransformer;
