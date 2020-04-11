new Book.DefinePlugIns("a", {
    init: function (dom) {
        dom.appendChild(this.canvas = document.createElement("canvas"));
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), this.scene);
        this.camera.attachControl(this.canvas, true);
        this.light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        this.light2 = new BABYLON.PointLight("light3", new BABYLON.Vector3(0, 1, -1), this.scene);
        this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, this.scene);
        let self = this;
        this.engine.runRenderLoop(function(){
            self.scene.render();  // 渲染场景
        });
        window.addEventListener("resize", function(){
            self.engine.resize();
        });
    }
});