/** ExaTN::Numerics: Tensor factory
REVISION: 2018/11/18

Copyright (C) 2018-2018 Dmitry I. Lyakh (Liakh)
Copyright (C) 2018-2018 Oak Ridge National Laboratory (UT-Battelle) **/

#ifndef TENSOR_FACTORY_HPP_
#define TENSOR_FACTORY_HPP_

#include "tensor_basic.hpp"
#include "tensor.hpp"

#include <assert.h>

#include <memory>
#include <iostream>

namespace exatn{

namespace numerics{

class TensorFactory{
public:

 TensorFactory() = default;
 TensorFactory(const TensorFactory & tens_factory) = delete;
 TensorFactory & operator=(const TensorFactory & tens_factory) = delete;
 TensorFactory(TensorFactory && tens_factory) = default;
 TensorFactory & operator=(TensorFactory && tens_factory) = default;
 virtual ~TensorFactory() = default;

 /** Create a tensor by providing its name, shape and signature. **/
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,             //tensor kind
                                      const std::string & name,           //tensor name
                                      const TensorShape & shape,          //tensor shape
                                      const TensorSignature & signature); //tensor signature
 /** Create a tensor by providing its name and shape.
     The signature defaults to SOME_SPACE spaces and lbound=0 subspaces. **/
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,             //tensor kind
                                      const std::string & name,           //tensor name
                                      const TensorShape & shape);         //tensor shape
 /** Create a tensor by providing its name, shape and signature from scratch. **/
 template<typename T>
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,                                          //tensor kind
                                      const std::string & name,                                        //tensor name
                                      std::initializer_list<T> extents,                                //tensor dimension extents
                                      std::initializer_list<std::pair<SpaceId,SubspaceId>> subspaces); //tensor dimension defining subspaces
 template<typename T>
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,                                        //tensor kind
                                      const std::string & name,                                      //tensor name
                                      const std::vector<T> & extents,                                //tensor dimension extents
                                      const std::vector<std::pair<SpaceId,SubspaceId>> & subspaces); //tensor dimension defining subspaces
 /** Create a tensor by providing its name and shape from scratch.
     The signature defaults to SOME_SPACE spaces and lbound=0 subspaces. **/
 template<typename T>
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,            //tensor kind
                                      const std::string & name,          //tensor name
                                      std::initializer_list<T> extents); //tensor dimension extents
 template<typename T>
 std::unique_ptr<Tensor> createTensor(TensorKind tensor_kind,          //tensor kind
                                      const std::string & name,        //tensor name
                                      const std::vector<T> & extents); //tensor dimension extents

};


//TEMPLATES:
template<typename T>
std::unique_ptr<Tensor> TensorFactory::createTensor(TensorKind tensor_kind,
                                                    const std::string & name,
                                                    std::initializer_list<T> extents,
                                                    std::initializer_list<std::pair<SpaceId,SubspaceId>> subspaces)
{
 switch(tensor_kind){
 case TensorKind::TENSOR:
  return std::unique_ptr<Tensor>(new Tensor(name,extents,subspaces));
 case TensorKind::TENSOR_SHA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_SHA not yet implemented!" << std::endl; assert(false);
 case TensorKind::TENSOR_EXA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_EXA not yet implemented!" << std::endl; assert(false);
 default:
  std::cout << "ERROR(TensorFactory:createTensor): Unknown tensor kind!" << std::endl; assert(false);
 };
}

template<typename T>
std::unique_ptr<Tensor> TensorFactory::createTensor(TensorKind tensor_kind,
                                                    const std::string & name,
                                                    const std::vector<T> & extents,
                                                    const std::vector<std::pair<SpaceId,SubspaceId>> & subspaces)
{
 switch(tensor_kind){
 case TensorKind::TENSOR:
  return std::unique_ptr<Tensor>(new Tensor(name,extents,subspaces));
 case TensorKind::TENSOR_SHA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_SHA not yet implemented!" << std::endl; assert(false);
 case TensorKind::TENSOR_EXA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_EXA not yet implemented!" << std::endl; assert(false);
 default:
  std::cout << "ERROR(TensorFactory:createTensor): Unknown tensor kind!" << std::endl; assert(false);
 };
}

template<typename T>
std::unique_ptr<Tensor> TensorFactory::createTensor(TensorKind tensor_kind,
                                                    const std::string & name,
                                                    std::initializer_list<T> extents)
{
 switch(tensor_kind){
 case TensorKind::TENSOR:
  return std::unique_ptr<Tensor>(new Tensor(name,extents));
 case TensorKind::TENSOR_SHA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_SHA not yet implemented!" << std::endl; assert(false);
 case TensorKind::TENSOR_EXA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_EXA not yet implemented!" << std::endl; assert(false);
 default:
  std::cout << "ERROR(TensorFactory:createTensor): Unknown tensor kind!" << std::endl; assert(false);
 };
}

template<typename T>
std::unique_ptr<Tensor> TensorFactory::createTensor(TensorKind tensor_kind,
                                                    const std::string & name,
                                                    const std::vector<T> & extents)
{
 switch(tensor_kind){
 case TensorKind::TENSOR:
  return std::unique_ptr<Tensor>(new Tensor(name,extents));
 case TensorKind::TENSOR_SHA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_SHA not yet implemented!" << std::endl; assert(false);
 case TensorKind::TENSOR_EXA:
  std::cout << "ERROR(TensorFactory:createTensor): Tensor kind TENSOR_EXA not yet implemented!" << std::endl; assert(false);
 default:
  std::cout << "ERROR(TensorFactory:createTensor): Unknown tensor kind!" << std::endl; assert(false);
 };
}

} //namespace numerics

} //namespace exatn

#endif //TENSOR_FACTORY_HPP_
