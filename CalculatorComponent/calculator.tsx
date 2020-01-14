import * as React from "react";
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';

// Suppress office UI fabric icon warnings.
setIconOptions({
    disableWarnings: true,
});

export interface ICalculatorProps {
    variableA?: number;
    variableB?: number;
    operator?: string,
    answer?: number;

    variableAChanged?: (newValue?: number) => void;
    variableBChanged?: (newValue?: number) => void;
    operatorChanged?: (newValue?: string) => void;
    answerChanged?: (newValue?: number) => void;
}

export interface ICalculatorState extends React.ComponentState, ICalculatorProps {

}

export class Calculator extends React.Component<ICalculatorProps, ICalculatorState> {

    constructor(props: ICalculatorProps) {
        super(props);

        this.state = {
            variableA: props.variableA,
            variableB: props.variableB,
            operator: props.operator,
            answer: props.answer
        };
    }

    public componentWillReceiveProps(newProps: ICalculatorProps): void {
        this.setState(newProps);
    }

    // TextFields don't have to be inside Stacks, we're just using Stacks for layout
    columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } }
    };

    public render(): JSX.Element {
        const { variableA, variableB, operator, answer } = this.state;


        return (
            <div>
                <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
                    <Stack {...this.columnProps}>
                        <TextField label="Variable A" value={variableA?.toString()} onChange={this.onChange_variableA} />
                        <TextField label="Variable B" value={variableB?.toString()} onChange={this.onChange_variableB} />
                        <TextField label="Operator" value={operator} onChange={this.onChange_operator} />
                        <PrimaryButton text=" = " onClick={this.onEqualClicked} />
                        <TextField label="Answer" value={answer?.toString()} readOnly />
                    </Stack>
                </Stack>
            </div>
        );
    };

    onEqualClicked = () => { 
        // let result = (this.state.variableA ?? 0) + (this.state.variableB ?? 0);
        let action = this.state.operator || '';
        let result: any;
        try { 
            result = window.eval((this.state.variableA ?? 0) + action + (this.state.variableB ?? 0));
        }
        catch(ex)
        { 
            result = 0;
            console.log(ex);
        }
        
        this.setState(
			(prevState: ICalculatorState): ICalculatorState => {
				prevState.answer = parseInt(result);
				return prevState;
			}
		);
		if (this.props.answerChanged) {
			this.props.answerChanged(parseInt(result));
		}
    }

    onChange_variableA = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>  { 
		this.setState(
			(prevState: ICalculatorState): ICalculatorState => {
				prevState.variableA = parseInt(newValue || '');
				return prevState;
			}
		);
		if (this.props.variableAChanged) {
			this.props.variableAChanged(parseInt(newValue || ''));
		}
    }

    onChange_variableB = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => { 
		this.setState(
			(prevState: ICalculatorState): ICalculatorState => {
				prevState.variableB = parseInt(newValue || '');
				return prevState;
			}
		);
		if (this.props.variableBChanged) {
			this.props.variableBChanged(parseInt(newValue || ''));
		}
    }

    onChange_operator = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => { 
		this.setState(
			(prevState: ICalculatorState): ICalculatorState => {
				prevState.operator = newValue;
				return prevState;
			}
		);
		if (this.props.operatorChanged) {
			this.props.operatorChanged(newValue);
		}
    }
}