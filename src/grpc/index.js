import { getOrdersHandler } from './order/orderCalls'

const makeList = () =>
  JSON.parse(
    '{"1143":["5111.0000.0000","5609.0000.0000","0222.0000.0000","1393.0000.0000"],"1205":["4737.0000.0000","7649.0000.0000","4070.0000.0000"],"1216":["4285.0000.0000","6966.0000.0000","2030.0000.0000","5542.0000.0000"],"2064":["5769.0000.0000","1544.0000.0000","8955.0000.0000","2912.0000.0000"],"2144":["5424.0000.0000","8106.0000.0000","0932.0000.0000","6220.0000.0000","8284.0000.0000"],"2260":["1681.0000.0000"],"2267":["4446.0000.0000","5119.0000.0000","8407.0000.0000","2598.0000.0000"],"2632":["3010.0000.0000","1605.0000.0000","9574.0000.0000"],"2684":["6536.0000.0000","7036.0000.0000","3114.0000.0000","6618.0000.0000"],"2768":["0768.0000.0000","9957.0000.0000","3474.0000.0000","0894.0000.0000","6913.0000.0000","0880.0000.0000","9436.0000.0000"],"2828":["4897.0000.0000","6231.0000.0000","9497.0000.0000","6870.0000.0000","0014.0000.0000"],"3543":["2751.0000.0000","9510.0000.0000","9740.0000.0000","0696.0000.0000"],"4302":["1823.0000.0000","1042.0000.0000","9457.0000.0000","1344.0000.0000","7860.0000.0000","4504.0000.0000","6818.0000.0000"],"4565":["6823.0000.0000","9821.0000.0000","6311.0000.0000","1796.0000.0000","9229.0000.0000","8011.0000.0000","5838.0000.0000"],"4805":["0903.0000.0000","4129.0000.0000","4352.0000.0000","0266.0000.0000"],"4961":["9797.0000.0000","4213.0000.0000","8973.0000.0000","5723.0000.0000"],"5368":["4144.0000.0000","8938.0000.0000","7631.0000.0000","8179.0000.0000","8276.0000.0000","3790.0000.0000","2757.0000.0000"],"5661":["9208.0000.0000","8671.0000.0000","7820.0000.0000","6889.0000.0000"],"6035":["6750.0000.0000","3858.0000.0000","2853.0000.0000","5794.0000.0000","1731.0000.0000","5996.0000.0000","7760.0000.0000"],"6692":["2815.0000.0000","0612.0000.0000"],"6820":["4958.0000.0000","3979.0000.0000"],"6863":["2005.0000.0000","0854.0000.0000","0941.0000.0000"],"7058":["0088.0000.0000","9120.0000.0000","4078.0000.0000","3025.0000.0000","6938.0000.0000","8346.0000.0000"],"7213":["6432.0000.0000","1348.0000.0000","1048.0000.0000","4630.0000.0000","2724.0000.0000"],"7629":["6303.0000.0000","2352.0000.0000","6326.0000.0000"],"7638":["7450.0000.0000","2715.0000.0000","7928.0000.0000","1341.0000.0000","4865.0000.0000","9520.0000.0000"],"8312":["7962.0000.0000","3090.0000.0000","1335.0000.0000","6877.0000.0000","6623.0000.0000","7097.0000.0000","1270.0000.0000"],"8999":["8151.0000.0000","7821.0000.0000","1134.0000.0000","6310.0000.0000","8299.0000.0000"],"9572":["5973.0000.0000","6786.0000.0000"],"9582":["6973.0000.0000","1540.0000.0000","9697.0000.0000","9248.0000.0000","2499.0000.0000","8473.0000.0000"],"9709":["9497.0000.0000","1208.0000.0000","3363.0000.0000"],"9716":["3939.0000.0000","1613.0000.0000","3833.0000.0000","2394.0000.0000"],"0747":["2875.0000.0000"],"0289":["0711.0000.0000"],"0800":["1454.0000.0000"]}',
  )

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const getOrdersGenerator = async () => {
  const fail = Math.random * 10 > 7.5
  let result = makeList()
  await timeout(5000)
  return fail
    ? { status: 'fail', message: 'random error' }
    : { statul: 'success', orders: result }
}

function getOrders() {
  return getOrdersHandler(getOrdersGenerator)
}

export const grpc = {
  orders: {
    get: getOrders,
  },
}