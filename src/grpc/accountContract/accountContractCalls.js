export const getAccountContractsHandler = async (grpcProc) => {
  const result = await grpcProc()
  if (result.status === 'fail') throw new Error(result.message)
  return result.accountContracts
}
