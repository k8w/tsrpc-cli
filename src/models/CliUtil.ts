import ora from "ora";

export class CliUtil {
    static spinner = ora('');
    static currentDoingText: string | undefined;

    static doing(text: string, doingPostFix: string = '...') {
        if (this.currentDoingText !== undefined) {
            this.spinner.stop();
        }
        this.currentDoingText = text;
        this.spinner.text = `${text}${doingPostFix}\n`.yellow;
        this.spinner.start();
    }
    static done(succ: boolean = true, text?: string) {
        if (this.currentDoingText !== undefined) {
            text = `${text ?? this.currentDoingText}`
            succ ? this.spinner.succeed(text.green) : this.spinner.fail(text.red);
            this.currentDoingText = undefined;
        }
    }
    static clear() {
        this.spinner.stop();
        this.currentDoingText = undefined;
    }
}