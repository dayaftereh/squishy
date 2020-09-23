declare namespace Mathf {


    class Matrix3 {
        private elements;
        constructor(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number);
        static zero(): Matrix3;
        static identity(): Matrix3;
        clone(): Matrix3;
        multiplyWith(m: Matrix3): Matrix3;
        premultiplyWith(m: Matrix3): Matrix3;
        static multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;
        multiplyScalar(s: number): Matrix3;
        determinant(): number;
        inverse(): Matrix3;
        transpose(): Matrix3;
        normalMatrix(): Matrix3;
        transform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3;
        scale(sx: number, sy: number): Matrix3;
        rotate(theta: number): Matrix3;
        translate(tx: number, ty: number): Matrix3;
        applyVec2(v: Vec2): Vec2;
        applyPoint2(p: Point2): Point2;
        applyVec3(v: Vec3): Vec3;
        applyPoint3(p: Point3): Point3;
        at(index: number): number;
    }


    class Vec2 {
        x: number | undefined;
        y: number | undefined;
        constructor(x: number, y: number);
        dot(x: number, y: number): number;
        dotWith(v: Vec2): number;
        cross(x: number, y: number): number;
        crossWith(v: Vec2): number;
        lengthSquared(): number;
        length(): number;
        normalize(): Vec2;
        angle(x: number, y: number): number;
        angleWith(v: Vec2): number;
        scale(s: number): Vec2;
        add(x: number, y: number): Vec2;
        addWith(v: Vec2): Vec2;
        multiply(x: number, y: number): Vec2;
        multiplyWith(v: Vec2): Vec2;
        divide(x: number, y: number): Vec2;
        divideWith(v: Vec2): Vec2;
        subtract(x: number, y: number): Vec2;
        subtractWith(v: Vec2): Vec2;
        inverse(): Vec2;
        clone(): Vec2;
        perpendicularCW(): Vec2;
        perpendicularCCW(): Vec2;
        random(): Vec2;
        applyMatrix3(m: Matrix3): Vec2;
        rotateAround(cx: number, cy: number, angle: number): Vec2;
        rotateAroundWith(center: Vec2, angle: number): Vec2;
    }



    class Vec3 {
        x: number | undefined;
        y: number | undefined;
        z: number | undefined;
        constructor(x: number, y: number, z: number);
        lengthSquared(): number;
        length(): number;
        dot(x: number, y: number, z: number): number;
        dotWith(v: Vec3): number;
        normalize(): Vec3;
        cross(x: number, y: number, z: number): Vec3;
        crossWith(v: Vec3): Vec3;
        scale(s: number): Vec3;
        add(x: number, y: number, z: number): Vec3;
        addWith(v: Vec3): Vec3;
        multiply(x: number, y: number, z: number): Vec3;
        multiplyWith(v: Vec3): Vec3;
        divide(x: number, y: number, z: number): Vec3;
        divideWith(v: Vec3): Vec3;
        subtract(x: number, y: number, z: number): Vec3;
        subtractWith(v: Vec3): Vec3;
        inverse(): Vec3;
        clone(): Vec3;
        random(): Vec3;
        applyMatrix3(m: Matrix3): Vec3;
        applyMatrix4(m: Matrix4): Vec3;
        applyQuaternion(q: Quaternion): Vec3;
        distanceSquared(x: number, y: number, z: number): number;
        distanceSquaredTo(p: Vec3): number;
        distance(x: number, y: number, z: number): number;
        distanceTo(p: Vec3): number;
    }


    class Matrix4 {
        private elements;
        constructor(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number);
        static identity(): Matrix4;
        static zero(): Matrix4;
        clone(): Matrix4;
        rotationFromEuler(x: number, y: number, z: number): Matrix4;
        lookAt(eye: Vec3, target: Vec3, up: Vec3): Matrix4;
        multiply(m: Matrix4): Matrix4;
        premultiply(m: Matrix4): Matrix4;
        static multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;
        multiplyScalar(s: number): Matrix4;
        determinant(): number;
        transpose(): Matrix4;
        inverse(): Matrix4;
        multiplyScale(x: number, y: number, z: number): Matrix4;
        multiplyScaleWith(v: Vec3): Matrix4;
        translation(x: number, y: number, z: number): Matrix4;
        rotationX(theta: number): Matrix4;
        rotationY(theta: number): Matrix4;
        rotationZ(theta: number): Matrix4;
        rotationAxis(x: number, y: number, z: number, angle: number): Matrix4;
        rotationAxisWith(axis: Vec3, angle: number): Matrix4;
        scale(x: number, y: number, z: number): Matrix4;
        scaleWith(v: Vec3): Matrix4;
        shear(x: number, y: number, z: number): Matrix4;
        shearWith(v: Vec3): Matrix4;
        perspective(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
        orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
        applyVec3(v: Vec3): Vec3;
        applyPoint3(p: Point3): Point3;
        at(index: number): number;
        compose(position: Vec3, quaternion: Quaternion, scale: Vec3): Matrix4;
        rotationFromQuaternion(q: Quaternion): Matrix4;
        maxScaleOnAxis(): number;
    }


    class Point3 {
        x: number | undefined;
        y: number | undefined;
        z: number | undefined;
        constructor(x: number, y: number, z: number);
        translate(dx: number, dy: number, dz: number): Point3;
        translateWith(v: Vec3): Point3;
        translateDirection(direction: Vec3, length: number): Point3;
        distanceSquared(x: number, y: number, z: number): number;
        distanceSquaredTo(p: Point3): number;
        distance(x: number, y: number, z: number): number;
        distanceTo(p: Point3): number;
        subtract(x: number, y: number, z: number): Vec3;
        subtractWith(p: Point3): Vec3;
        center(x: number, y: number, z: number): Point3;
        centerWith(p: Point3): Point3;
        clone(): Point3;
        applyMatrix3(m: Matrix3): Point3;
        applyMatrix4(m: Matrix4): Point3;
        applyQuaternion(q: Quaternion): Point3;
    }


    class Quaternion {
        x: number | undefined;
        y: number | undefined;
        z: number | undefined;
        w: number | undefined;
        constructor(x: number, y: number, z: number, w: number);
        static zero(): Quaternion;
        clone(): Quaternion;
        fromEuler(x: number, y: number, z: number): Quaternion;
        fromEulerWith(v: Vec3): Quaternion;
        fromAxisAngle(x: number, y: number, z: number, angle: number): Quaternion;
        fromAxisAngleWith(v: Vec3, angle: number): Quaternion;
        private fromMatrix;
        fromMatrix3(m: Matrix3): Quaternion;
        fromMatrix4(m: Matrix4): Quaternion;
        fromUnitVectors(vFrom: Vec3, vTo: Vec3): Quaternion;
        angleTo(q: Quaternion): number;
        static identity(): Quaternion;
        inverse(): Quaternion;
        conjugate(): Quaternion;
        dot(q: Quaternion): number;
        lengthSquared(): number;
        length(): number;
        normalize(): Quaternion;
        multiply(q: Quaternion): Quaternion;
        premultiply(q: Quaternion): Quaternion;
        static multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion;
        slerp(q: Quaternion, t: number): Quaternion;
        applyVec3(v: Vec3): Vec3;
        applyPoint3(p: Point3): Point3;
    }



    class Point2 {
        x: number | undefined;
        y: number | undefined;
        constructor(x: number, y: number);
        translate(dx: number, dy: number): Point2;
        translateWith(v: Vec2): Point2;
        translateDirection(direction: Vec2, length: number): Point2;
        distanceSquared(x: number, y: number): number;
        distanceSquaredTo(p: Point2): number;
        distance(x: number, y: number): number;
        distanceTo(p: Point2): number;
        subtract(x: number, y: number): Vec2;
        subtractWith(p: Point2): Vec2;
        center(x: number, y: number): Point2;
        centerWith(p: Point2): Point2;
        clone(): Point2;
        applyMatrix3(m: Matrix3): Point2;
    }



    class Plane {
        normal: Vec3 | undefined;
        constant: number | undefined;
        constructor(normal: Vec3, constant: number);
        clone(): Plane;
        negate(): Plane;
        distanceToPoint(point: Vec3): number;
        projectPoint(point: Vec3): Vec3;
        translate(offset: Vec3): Plane;
        coplanarPoint(): Vec3;
        normalAt(point: Vec3): Vec3;
    }



    class Ray {
        origin: Vec3 | undefined;
        direction: Vec3 | undefined;
        constructor(origin: Vec3, direction: Vec3);
        clone(): Ray;
        at(t: number): Vec3;
        lookAt(v: Vec3): Ray;
        recast(t: number): Ray;
        closestPointToPoint(point: Vec3): Vec3;
        distanceSquaredToPoint(point: Vec3): number;
        applyMatrix4(m: Matrix4): Ray;
        applyQuaternion(q: Quaternion): Ray;
        distanceToPlane(plane: Plane): number | undefined;
        intersectPlane(plane: Plane): Vec3 | undefined;
        intersectsPlane(plane: Plane): boolean;
        intersectSphere(sphere: Sphere): Vec3 | undefined;
        intersectsSphere(sphere: Sphere): boolean;
    }


    class Sphere {
        center: Vec3 | undefined;
        radius: number | undefined;
        constructor(center: Vec3, radius: number);
        containsPoint(point: Vec3): boolean;
        distanceToPoint(point: Vec3): number;
        intersectsPlane(plane: Plane): boolean;
        translate(offset: Vec3): Sphere;
        applyMatrix4(m: Matrix4): Sphere;
        normalAt(point: Vec3): Vec3;
    }



    /**
     * [a c e]
     * [b d f]
     * [0 0 1]
     */
    class Transform2 {
        a: number | undefined;
        b: number | undefined;
        c: number | undefined;
        d: number | undefined;
        e: number | undefined;
        f: number | undefined;
        constructor(a: number, b: number, c: number, d: number, e: number, f: number);
        scale(sx: number, sy: number): Transform2;
        scaleWith(v: Vec2): Transform2;
        det(): number;
        inverse(): Transform2;
        multiply(t: Transform2): Transform2;
        transform(x: number, y: number): Point2;
        transformVec(v: Vec2): Vec2;
        transformPoint(p: Point2): Mathf.Point2;
        scaleX(): number;
        scaleY(): number;
        translateX(): number;
        translateY(): number;
        static identity(): Transform2;
        translate(dx: number, dy: number): Transform2;
        rotate(theta: number): Transform2;
        rotateDegrees(theta: number): Transform2;
        clone(): Transform2;
    }



    const EPSILON: number


    function clamp(min: number, value: number, max: number): number;

    function toDegrees(rad: number): number;

    function toRadians(deg: number): number;

    function closeZero(x: number): boolean;

    function closeEquals(a: number, b: number): boolean;


    class Random {
        float(): number;
        intN(n: number): number;
        choice<T>(array: T[]): T | undefined;
        rndStr(): string;
        randomString(n: number): string;
    }



}
declare class Squishy {
    context: any;
    progress(value: number): void;
}


declare const Squishy: Squishy