import { injectable } from "inversify";
import { Action, CircularNode,CreateElementAction, CreatingOnDrag, creatingOnDragFeature, EditableLabel, 
    editLabelFeature, hoverFeedbackFeature, ManhattanEdgeRouter, popupFeature,  
     SChildElement, SEdge, SGraph, SGraphFactory, SLabel, SModelElementSchema, 
    SParentElement, SRoutableElement, EdgePlacement, CircularPort,  boundsFeature, fadeFeature, layoutContainerFeature, openFeature, selectFeature } from "sprotty";

@injectable()
export class TensorModelFactory extends SGraphFactory {


    protected initializeChild(child: SChildElement, schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        super.initializeChild(child, schema, parent);
        if (child instanceof SEdge) {
            child.routerKind = ManhattanEdgeRouter.KIND;
            child.targetAnchorCorrection = Math.sqrt(5)
        } else if (child instanceof SLabel) {
            child.edgePlacement = <EdgePlacement> {
                rotate: true,
                position: 0.5
            }
        }
        return child
    }
}

export class TensorDiagram extends SGraph {
    hasFeature(feature: symbol): boolean {
        return feature === hoverFeedbackFeature || feature === popupFeature || super.hasFeature(feature);
    }
}

export class TensorNode extends CircularNode {
    trace: string | undefined
    strokeWidth = 1
    canConnect(routable: SRoutableElement, role: string) {
        return true;
    }
    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature
            || feature === layoutContainerFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class BlankTensorNode extends CircularNode {
    trace: string | undefined
    strokeWidth = 1
    canConnect(routable: SRoutableElement, role: string) {
        return true;
    }
    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature
            || feature === layoutContainerFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class TensorEdge extends SEdge {
    trace: String | undefined

    hasFeature(feature: symbol) {
        return super.hasFeature(feature) || feature === selectFeature || (feature === openFeature && this.trace !== undefined)
    }
}


export class CreateTransitionPort extends CircularPort implements CreatingOnDrag {
    createAction(id: string): Action {
        return new CreateElementAction(this.root.id, <SModelElementSchema> {
            id, type: 'edge', sourceId: this.parent.id, targetId: this.id
        });
    }

    hasFeature(feature: symbol): boolean {
        return feature === popupFeature || feature === creatingOnDragFeature || super.hasFeature(feature);
    }
}

export class TensorLabel extends SLabel implements EditableLabel {
    trace: string | undefined
    hasFeature(feature: symbol): boolean {
        return feature === editLabelFeature || super.hasFeature(feature)|| feature === selectFeature || (feature === openFeature && this.trace !== undefined)
    }

}
