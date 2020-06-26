/** ExaTN::Numerics: Tensor operation: Orthogonalizes a tensor via SVD
REVISION: 2020/06/25

Copyright (C) 2018-2020 Dmitry I. Lyakh (Liakh)
Copyright (C) 2018-2020 Oak Ridge National Laboratory (UT-Battelle) **/

#include "exatn_service.hpp"

#include "tensor_op_orthogonalize_svd.hpp"

#include "tensor_node_executor.hpp"

namespace exatn{

namespace numerics{

TensorOpOrthogonalizeSVD::TensorOpOrthogonalizeSVD():
 TensorOperation(TensorOpCode::ORTHOGONALIZE_SVD,1,0,1,{0})
{
}

bool TensorOpOrthogonalizeSVD::isSet() const
{
 return (this->getNumOperandsSet() == this->getNumOperands() && this->getIndexPattern().length() > 0);
}

int TensorOpOrthogonalizeSVD::accept(runtime::TensorNodeExecutor & node_executor,
                                     runtime::TensorOpExecHandle * exec_handle)
{
 return node_executor.execute(*this,exec_handle);
}

std::unique_ptr<TensorOperation> TensorOpOrthogonalizeSVD::createNew()
{
 return std::unique_ptr<TensorOperation>(new TensorOpOrthogonalizeSVD());
}

} //namespace numerics

} //namespace exatn
