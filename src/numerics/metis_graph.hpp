/** ExaTN::Numerics: Graph k-way partitioning via METIS
REVISION: 2020/04/25

Copyright (C) 2018-2020 Dmitry I. Lyakh (Liakh)
Copyright (C) 2018-2020 Oak Ridge National Laboratory (UT-Battelle) **/

/** Rationale:
**/

#ifndef EXATN_NUMERICS_METIS_GRAPH_HPP_
#define EXATN_NUMERICS_METIS_GRAPH_HPP_

#include "metis.h"

#include "tensor_basic.hpp"

#include <vector>

namespace exatn{

namespace numerics{

class TensorNetwork;


class MetisGraph{

public:

 MetisGraph();

 MetisGraph(const TensorNetwork & network);

 MetisGraph(const MetisGraph &) = default;
 MetisGraph & operator=(const MetisGraph &) = default;
 MetisGraph(MetisGraph &&) noexcept = default;
 MetisGraph & operator=(MetisGraph &&) noexcept = default;
 ~MetisGraph() = default;

 /** Clears back to an empty state. **/
 void clear();

 /** Appends a new vertex with its edges. **/
 void appendEdges(std::size_t num_edges,      //in: number of edges (number of adjacent vertices)
                  std::size_t * adj_vertices, //in: adjacent vertices (numbering starts from 0)
                  std::size_t * edge_weights, //in: edge weights (>0)
                  std::size_t vertex_weight); //in: vertex weight (>=0)

 /** Partitions the graph into a desired number of parts. **/
 bool partitionGraph(std::size_t num_parts, //in: number of parts
                     double imbalance);     //in: imbalance tolerance (>= 1.0)

 /** Retrieves the graph partitions and the achieved edge cut value. **/
 const std::vector<idx_t> & getPartitions(std::size_t * edge_cut) const;

protected:

 void initMetisGraph();

private:

 idx_t options_[METIS_NOPTIONS];   //METIS options

 idx_t num_vertices_;              //number of vertices in the graph
 std::vector<idx_t> xadj_,adjncy_; //graph structure stored in the CSR format
 std::vector<idx_t> vwgt_;         //vertex weights
 std::vector<idx_t> adjwgt_;       //edge weights

 idx_t num_parts_;               //number of parts in graph partitioning
 std::vector<real_t> tpwgts_;    //desired weight of each partition (adds up to 1.0)
 std::vector<real_t> ubvec_;     //imbalance tolerance for each partition (>= 1.0)
 std::vector<idx_t> partitions_; //computed partitions
 idx_t edge_cut_;                //achieved edge cut
};


} //namespace numerics

} //namespace exatn

#endif //EXATN_NUMERICS_METIS_GRAPH_HPP_
