/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    VariableA: ComponentFramework.PropertyTypes.NumberProperty;
    VariableB: ComponentFramework.PropertyTypes.NumberProperty;
    Operator: ComponentFramework.PropertyTypes.StringProperty;
    Answer: ComponentFramework.PropertyTypes.NumberProperty;
}
export interface IOutputs {
    VariableA?: number;
    VariableB?: number;
    Operator?: string;
    Answer?: number;
}
