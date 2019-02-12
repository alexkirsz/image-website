import React from "react";

const RED = "#f50057";
const GREEN = "#64dd17";
const BLUE = "#00b0ff";
const YELLOW = "#ffea00";
const CYAN = "#84ffff";
const MAGENTA = "#ea80fc";

const TRIANGLE =
  "M93.49,75C100.41,63,64.05,0,50.2,0S0,63,6.91,75,86.56,87,93.49,75Z";

function Triangle(props: React.SVGProps<SVGPathElement>) {
  return <path d={TRIANGLE} {...props} />;
}

function Text() {
  return (
    <>
      <path d="M26.58,56.55H25.17V43.45h1.41Z" />
      <path d="M32.82,56.55H31.41V43.45H32l.5,1.29a3.34,3.34,0,0,1,1.11-1.16,2.78,2.78,0,0,1,1.49-.43,2.46,2.46,0,0,1,2.6,1.47,2.92,2.92,0,0,1,2.54-1.47A2.5,2.5,0,0,1,43.1,46V56.55H41.69V46c0-1.07-.49-1.61-1.45-1.61a2.22,2.22,0,0,0-1.56.68A1.92,1.92,0,0,0,38,46.37V56.55H36.55V46c0-1.07-.48-1.61-1.45-1.61a2.28,2.28,0,0,0-1.56.65,1.83,1.83,0,0,0-.72,1.3Z" />
      <path d="M54,56.55h-.61l-.52-1.29a3.34,3.34,0,0,1-1.11,1.16,2.85,2.85,0,0,1-1.51.43c-1.93,0-2.9-.94-2.9-2.82V52c0-1.88,1-2.82,2.9-2.82h2.34v-3.3a1.43,1.43,0,0,0-.47-1.13,2,2,0,0,0-1.37-.4c-1.19,0-1.79.51-1.79,1.53v1.19H47.53V46a2.69,2.69,0,0,1,.8-2.08,3.43,3.43,0,0,1,2.4-.74,3.51,3.51,0,0,1,2.43.74A2.67,2.67,0,0,1,54,46ZM52.57,50.4H50.23a1.38,1.38,0,0,0-1.17.43A1.93,1.93,0,0,0,48.74,52v2a2,2,0,0,0,.32,1.19,1.41,1.41,0,0,0,1.17.42A2.33,2.33,0,0,0,51.8,55a2,2,0,0,0,.77-1.3Z" />
      <path d="M61.29,51.11V49.9H65V54a2.64,2.64,0,0,1-.83,2.08,3.64,3.64,0,0,1-2.48.74,3.73,3.73,0,0,1-2.5-.74A2.61,2.61,0,0,1,58.31,54V46a2.63,2.63,0,0,1,.82-2.08,3.64,3.64,0,0,1,2.48-.74,3.71,3.71,0,0,1,2.5.74A2.62,2.62,0,0,1,65,46v1.11H63.55V46c0-1.07-.64-1.61-1.92-1.61s-1.91.54-1.91,1.61V54c0,1.07.64,1.61,1.91,1.61s1.92-.54,1.92-1.61V51.11Z" />
      <path d="M74.42,54V52.92h1.41V54A2.63,2.63,0,0,1,75,56.11a3.64,3.64,0,0,1-2.48.74,3.73,3.73,0,0,1-2.5-.74A2.61,2.61,0,0,1,69.19,54V46A2.63,2.63,0,0,1,70,43.89a3.64,3.64,0,0,1,2.48-.74,3.73,3.73,0,0,1,2.5.74A2.61,2.61,0,0,1,75.83,46V50.4H70.6V54c0,1.07.63,1.61,1.91,1.61S74.42,55.1,74.42,54ZM70.6,46v3.22h3.82V46c0-1.07-.63-1.61-1.91-1.61S70.6,44.9,70.6,46Z" />{" "}
    </>
  );
}

function TriangleAnimation({
  duration,
  startAngle,
  angleDelta,
  revert = false,
  ...otherProps
}: {
  duration: number;
  startAngle: number;
  angleDelta: number;
  revert?: boolean;
} & React.SVGProps<SVGElement>) {
  let key1 = startAngle - angleDelta;
  let key2 = startAngle + angleDelta;

  if (revert) {
    [key1, key2] = [key2, key1];
  }

  const keyframes = [
    [startAngle, 0],
    [key1, 0.25],
    [key2, 0.75],
    [startAngle, 1],
  ];

  const easings = [
    // ease-out
    [0.0, 0.0, 0.58, 1.0],
    // ease-in-out
    [0.42, 0.0, 0.58, 1.0],
    // ease-in
    [0.42, 0.0, 1.0, 1.0],
  ];

  return (
    <animateTransform
      attributeName="transform"
      dur={`${duration.toFixed(5)}s`}
      type="rotate"
      repeatCount="indefinite"
      calcMode="spline"
      values={keyframes.map(key => `${key[0].toFixed(5)} 50 50`).join("; ")}
      keyTimes={keyframes.map(key => key[1].toFixed(5)).join(";")}
      keySplines={easings
        .map(easing => easing.map(v => v.toFixed(5)).join(" "))
        .join("; ")}
      {...otherProps}
    />
  );
}

function RedTriangleAnimation() {
  return <TriangleAnimation duration={37} startAngle={-40} angleDelta={10} />;
}

function GreenTriangleAnimation() {
  return (
    <TriangleAnimation duration={41} startAngle={0} angleDelta={10} revert />
  );
}

function BlueTriangleAnimation() {
  return <TriangleAnimation duration={43} startAngle={40} angleDelta={10} />;
}

export default function AnimatedLogo({
  withText = false,
  ...otherProps
}: { withText?: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Logo Majeure IMAGE"
      {...otherProps}
    >
      <defs>
        <Triangle id="red">
          <RedTriangleAnimation />
        </Triangle>

        <Triangle id="green">
          <GreenTriangleAnimation />
        </Triangle>

        <Triangle id="blue">
          <BlueTriangleAnimation />
        </Triangle>

        <clipPath id="redClip">
          {/* For some reason, using #red directly doesn't work here. */}
          <Triangle>
            <RedTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="greenClip">
          <Triangle>
            <GreenTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="blueClip">
          <Triangle>
            <BlueTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="whiteClip" clipPath="url(#redClip)">
          <Triangle>
            <GreenTriangleAnimation />
          </Triangle>
        </clipPath>
      </defs>

      {/* Put lighter colors on top so that edges artifacts are less visible. */}
      <use xlinkHref="#green" fill={GREEN} />
      <use xlinkHref="#blue" fill={BLUE} />
      <use xlinkHref="#red" fill={RED} />
      <use xlinkHref="#blue" fill={MAGENTA} clipPath="url(#redClip)" />
      <use xlinkHref="#red" fill={YELLOW} clipPath="url(#greenClip)" />
      <use xlinkHref="#green" fill={CYAN} clipPath="url(#blueClip)" />
      <use xlinkHref="#blue" fill="white" clipPath="url(#whiteClip)" />

      {withText && <Text />}
    </svg>
  );
}
