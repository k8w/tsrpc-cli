import 'k8w-extend-native';
import { cmdDoc } from "./commands/doc";

cmdDoc({
    input: './ptl',
    output: 'docs',
    ignore: undefined,
    verbose: true
})