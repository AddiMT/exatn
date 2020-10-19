import { Container, ContainerModule } from "inversify";
import 'sprotty/css/sprotty.css';
import { configureModelElement,  ConsoleLogger, LogLevel,    TYPES,   
         PolylineEdgeView,
     CircularNode,  configureViewerOptions, loadDefaultModules, overrideViewerOptions, SGraphView, ManhattanEdgeRouter, SButton, SLabelView, configureCommand, CreateElementCommand, HtmlRoot, HtmlRootView, PreRenderedElement, PreRenderedView, SModelRoot, SRoutingHandle, SRoutingHandleView} from 'sprotty';
import "../css/diagram.css";
import {   BlankCircleNodeView,CircleNodeView, DefaultCircleNodeView, TriangleButtonView 
  
} from "./views";
import { TensorModelFactory, TensorDiagram, TensorNode,   TensorEdge, TensorLabel, CreateTransitionPort } from "./model";
import { CustomRouter } from "./custom-edge-router";
import { PaletteButtonView } from "./html-views";


const tensorDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {

    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(TensorModelFactory);
    unbind(ManhattanEdgeRouter);
    bind(ManhattanEdgeRouter).to(CustomRouter).inSingletonScope();

    const context = { bind, unbind, isBound, rebind };

         
    configureModelElement(context, 'graph', TensorDiagram, SGraphView);
    configureModelElement(context, 'node:circle', TensorNode, CircleNodeView);
    configureModelElement(context, 'node:blankcircle', CircularNode, BlankCircleNodeView);
    configureModelElement(context, 'edge', TensorEdge, PolylineEdgeView);
    configureModelElement(context, 'node:defaultcircle', CircularNode, DefaultCircleNodeView);

    configureModelElement(context, 'button', SButton, PaletteButtonView);

    configureModelElement(context, 'label', TensorLabel, SLabelView);
    configureModelElement(context, 'label:xref', TensorLabel, SLabelView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
    configureModelElement(context, 'palette', SModelRoot, HtmlRootView);
    configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'port', CreateTransitionPort, TriangleButtonView)

    configureCommand(context, CreateElementCommand);

    configureViewerOptions(context, {
        needsClientLayout: false
    });
});

export function createTensorDiagramContainer(widgetId: string): Container {
    const container = new Container();
    loadDefaultModules(container);
    container.load(tensorDiagramModule);
    overrideViewerOptions(container, {
             needsClientLayout: true,
             needsServerLayout: true,
            baseDiv: widgetId,
             hiddenDiv: widgetId + '_hidden'
         });
  
    return container;
}

