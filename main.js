function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    background("azure");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function clear_canvas(){
    background("azure");
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(7);
    stroke("black");
    if (mouseIsPressed){
        line (pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,result){
    if (error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("label").innerHTML="Doodle = "+result[0].label;
        document.getElementById("label1").innerHTML="Confidence : "+Math.round(result[0].confidence*100)+"%";
        utterThis=new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterThis);
    }
}