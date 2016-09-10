function playFrequency() {
    context = new AudioContext;
    oscillator = context.createOscillator();
    oscillator.frequency.value = 200;

    oscillator.connect(context.destination);

    oscillator.start(0);
}

function stopFrequency() {
    oscillator.stop(0);
}
