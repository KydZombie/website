export class ItemRequirement {
    constructor(container, args) {
        this.container = container;
        this.args = args;
        this.haveAmount = 0;
        this.updateText();
    }
    getTranslationKey() {
        return "item." + this.args.itemName;
    }
    updateText() {
    }
    update() {
        // Own logic to track progress
    }
    isDone() {
        return this.haveAmount >= this.args.amount;
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1yZXF1aXJlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2FjdGlvbnMvcmVxdWlyZW1lbnRzL2l0ZW0tcmVxdWlyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxPQUFPLGVBQWU7SUFHeEIsWUFDVyxTQUE0QixFQUM1QixJQUdOO1FBSk0sY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDNUIsU0FBSSxHQUFKLElBQUksQ0FHVjtRQVBFLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFTMUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVTtJQUVWLENBQUM7SUFFTSxNQUFNO1FBQ1QsOEJBQThCO0lBQ2xDLENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7SUFFTSxTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9