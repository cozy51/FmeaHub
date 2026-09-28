export type Item = {id:string;processNo:string;processName:string;itemName:string;requirement:string;failureMode:string;failureCause:string;effectProduct:string;effectNextProcess:string;effectCustomer:string;currentControl:string;detectionMethod:string;comment:string;severity:number;occurrence:number;detection:number;recommendedAction:string;actionEffect:string;responsibleDepartment:string;plannedDate:string;completionDate:string;afterSeverity:number;afterOccurrence:number;afterDetection:number;plNo:string;partNo40:string;equipmentTool:string;note:string;customFields:Record<string,string>};
export type Field = keyof Item | 'rpn' | 'afterRpn';
export type Column = {field:Field;label:string;width:number;required?:boolean;editable?:boolean;rating?:boolean};
export type Format = {id:string;name:string;description:string;columns:Column[]};
export const rpn=(i:Item,after=false)=>(after?i.afterSeverity*i.afterOccurrence*i.afterDetection:i.severity*i.occurrence*i.detection);
