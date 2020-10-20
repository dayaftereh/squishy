declare namespace Mathf {

/**
 * The class is used to encapsulate colors in the default sRGBA color space.
 * Every color has an implicit alpha value of 1.0 or an explicit undefined provided in the constructor.
 * The alpha value defines the transparency of a color and can be represented by a value in the range 0.0 - 1.0
 */
 class Color {
    /**
     * the red component [0, 1]
     */
    r: number;
    /**
     * the green component [0, 1]
     */
    g: number;
    /**
     *  the blue component [0, 1]
     */
    b: number;
    /**
     * the alpha component [0, 1]
     */
    a: number | undefined;
    /**
     * Creates an sRGBA color with the specified red, green, blue, and alpha values in the range [0, 1].
     * @param r the red component
     * @param g the green component
     * @param b the blue component
     * @param a the alpha component
     */
    constructor(r: number, g: number, b: number, a?: number);
    /**
     * Converts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and returns a new color.
     * @param h The hue [0, 1]
     * @param s The saturation [0, 1]
     * @param l The lightness [0, 1]
     */
    static fromHSL(h: number, s: number, l: number): Color;
    /**
     * Creates a random RGB color using Color.fromHSL() with a random hue
     */
    static random(): Color;
    /**
     * converts the color to an html hexadecimal triplet string like #ffff00 or with alpha #ffff00ff
     */
    toHex(): string;
    /**
     * converts the color to a css color string like rgb(0, 0, 0) or rgba(0, 0, 0)
     */
    toString(): string;
    /**
     * checks if the color has a alpha value
     */
    isAlpha(): boolean;
    /**
     * Adds the RGB/A values of color to the RGB/A values of this color and returns a new color as result.
     * @param r Red channel value between [0, 1] to add
     * @param g Green channel value between [0, 1] to add
     * @param b Blue channel value between [0, 1] to add
     * @param a Alpha channel value between [0, 1] to add
     */
    add(r: number, g: number, b: number, a?: number): Color;
    /**
     * Adds the given color to this color and and returns a new color as result.
     * @param color the color to add
     */
    addWith(color: Color): Color;
    /**
     * Returns the red channel value between [0, 255]
     */
    getR(): number;
    /**
    * Returns the green channel value between [0, 255]
    */
    getG(): number;
    /**
    * Returns the blue channel value between [0, 255]
    */
    getB(): number;
    /**
    * Returns the alpha channel value between [0, 1].
    * If the color has no alpha the return is always 1.0
    * @see Color.isAlpha()
    */
    getAlpha(): number;
    /**
     * Linearly interpolates this color's RGB values toward the RGB values of the passed argument.
     * The t argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.
     * @param other color to converge on.
     * @param t interpolation factor in the closed interval [0, 1].
     */
    lerp(other: Color, t: number): Color;
}



/**
 * This class represents an elliptical arc on a 2D plane.
 * The class is based on `EllipseCurve2`.
 */
 class ArcCurve2 extends EllipseCurve2 {
    /**
     * creates a elliptical arc with the given values
     * @param xCenter the x center position of the arc
     * @param yCenter the y center position of the arc
     * @param radius the radius of the arc
     * @param startAngle the start angle in radians
     * @param endAngle the end angle in radians
     * @param clockwise if true, the arc is clockwise
     */
    constructor(xCenter: number, yCenter: number, radius: number, startAngle: number, endAngle: number, clockwise?: boolean);
    /**
     * creates a elliptical arc with the given values
     * @param center the center position of the arc
     * @param radius the radius of the arc
     * @param startAngle the start angle in radians
     * @param endAngle the end angle in radians
     * @param clockwise if true, the arc is clockwise
     * @see ArcCurve2()
     */
    static from(center: Vec3, radius: number, startAngle: number, endAngle: number, clockwise?: boolean): ArcCurve2;
}


/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y, and z).
 */
 class Vec3 {
    /**
     * the x value of this vector. Default is 0.
     */
    x: number | undefined;
    /**
     * the y value of this vector. Default is 0.
     */
    y: number | undefined;
    /**
     * the z value of this vector. Default is 0.
     */
    z: number | undefined;
    /**
     * Creates a new 3D vector.
     * @param x the x value of the vector.
     * @param y the y value of the vector.
     * @param z the z value of the vector.
     */
    constructor(x: number, y: number, z: number);
    /**
     * Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
     */
    lengthSquared(): number;
    /**
     * Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
     */
    length(): number;
    /**
     * Calculate the dot product of this vector and the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    dot(x: number, y: number, z: number): number;
    /**
     * Calculate the dot product of this vector and v.
     * @param v the other vector
     * @see Vec3.dot()
     */
    dotWith(v: Vec3): number;
    /**
     * Convert this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
     */
    normalize(): Vec3;
    /**
     * returns the cross product of this vec3 and the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    cross(x: number, y: number, z: number): Vec3;
    /**
     * returns the cross product of this vec3 and v.
     * @param v the other vector
     * @see Vec3.cross()
     */
    crossWith(v: Vec3): Vec3;
    /**
     * Multiplies this vector and the scalar s to a new vector vector.
     * @param s the scalar
     */
    scale(s: number): Vec3;
    /**
     * adds this vector and the given parameters to a new vector vector.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    add(x: number, y: number, z: number): Vec3;
    /**
     * adds this vector and v to a new vector vector.
     * @param v the other vector
     * @see Vec3.add()
     */
    addWith(v: Vec3): Vec3;
    /**
     * Adds this vector and the multiple of v and s to a new vector vector.
     * @param v the vector to scale
     * @param s the scale factor
     * @see Vec3.scale()
     * @see Vec3.addWith()
     */
    addScaledVector(v: Vec3, s: number): Vec3;
    /**
     * multiply this vector and the given parameters to a new vector vector.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    multiply(x: number, y: number, z: number): Vec3;
    /**
    * multiply this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.multiply()
    */
    multiplyWith(v: Vec3): Vec3;
    /**
     * divide this vector and the given parameters to a new vector vector.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    divide(x: number, y: number, z: number): Vec3;
    /**
    * divide this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.divide()
    */
    divideWith(v: Vec3): Vec3;
    /**
    * subtract this vector and the given parameters to a new vector vector.
    * @param x the x coordination
    * @param y the y coordination
    * @param z the z coordination
    */
    subtract(x: number, y: number, z: number): Vec3;
    /**
    * subtract this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.subtract()
    */
    subtractWith(v: Vec3): Vec3;
    /**
     * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
     */
    inverse(): Vec3;
    /**
     * Returns a new vector3 with the same x, y and z values as this one.
     */
    clone(): Vec3;
    /**
     * Creates a new vector with each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
     */
    static random(): Vec3;
    /**
     * Multiplies this vector and m to a new vector vector.
     * @param m the matrix to multiply
     */
    applyMatrix3(m: Matrix3): Vec3;
    /**
     * Multiplies this vector and m to a new vector vector.
     * @param m the matrix to multiply
     */
    applyMatrix4(m: Matrix4): Vec3;
    /**
     * Multiplies this vector and q to a new vector vector.
     * @param q the quaternion to multiply
     */
    applyQuaternion(q: Quaternion): Vec3;
    /**
     * Computes the squared distance from this vector to the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    distanceSquared(x: number, y: number, z: number): number;
    /**
     * Computes the squared distance from this vector to the given vector p.
     * @param p the other vector
     * @see Vec3.distanceSquared()
     */
    distanceSquaredTo(p: Vec3): number;
    /**
     * Computes the distance from this vector to the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     * @param z the z coordination
     */
    distance(x: number, y: number, z: number): number;
    /**
    * Computes the distance from this vector to the given vector p.
    * @param p the other vector
    * @see Vec3.distance()
    */
    distanceTo(p: Vec3): number;
    /**
     * Returns a unit vector for the x axis (1.0, 0.0, 0.0)
     */
    static xAxis(): Vec3;
    /**
     * Returns a unit vector for the y axis (0.0, 1.0, 0.0)
     */
    static yAxis(): Vec3;
    /**
     * Returns a unit vector for the z axis (0.0, 0.0, 1.0)
     */
    static zAxis(): Vec3;
    /**
     * Returns a new vector with 0.0 for x, y and z
     */
    static zero(): Vec3;
    /**
     * creates new orthogonal vector to this vector
     */
    orthogonal(): Vec3;
    /**
     * Reflect this vector off of plane orthogonal to normal. Normal is assumed to have unit length.
     * @param normal the normal to the reflecting plane
     */
    reflect(normal: Vec3): Vec3;
}


 class Matrix3 {
    private elements;
    /**
     * Creates and initializes the 3D Matrix to the 3x3.
     * The constructor takes the arguments in row-major order, while internally they are stored in the elements array in column-major order.
     * @param n11
     * @param n12
     * @param n13
     * @param n21
     * @param n22
     * @param n23
     * @param n31
     * @param n32
     * @param n33
     */
    constructor(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number);
    /**
     * Creates and initializes the 3D Matrix to the 3x3 with zero values.
     */
    static zero(): Matrix3;
    /**
     * Creates and initializes the 3D Matrix to the 3x3 identity matrix.
     */
    static identity(): Matrix3;
    /**
     * Creates a new Matrix3 and with identical elements to this one.
     */
    clone(): Matrix3;
    /**
     * Post-multiplies this matrix by m and returns the result in a new matrix.
     * @param m the matrix to multiply
     */
    multiplyWith(m: Matrix3): Matrix3;
    /**
     * Pre-multiplies this matrix by m and returns the result in a new matrix.
     * @param m the matrix to multiply
     */
    premultiplyWith(m: Matrix3): Matrix3;
    /**
     * multiplies both matrices with each other
     * @param a the first matrix
     * @param b the second matrix
     */
    static multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;
    /**
     * Multiplies every component of the matrix by the scalar value s and returns the result in a new matrix.
     * @param s the scalar to multiply
     */
    multiplyScalar(s: number): Matrix3;
    /**
     * Computes the determinant of this matrix.
     */
    determinant(): number;
    /**
     * Returns the inverse of the this matrix using the analytic method.
     * You can not invert a matrix with a determinant of zero.
     * If you attempt this, the method returns a zero matrix instead.
     */
    inverse(): Matrix3;
    /**
     * Transposes this matrix and returns the result in a new matrix.
     */
    transpose(): Matrix3;
    /**
     * Returns the normal matrix, which is the inverse transpose matrix of this.
     */
    normalMatrix(): Matrix3;
    /**
     * Creates a new UV transform matrix from offset, repeat, rotation, and center.
     * @param tx offset x
     * @param ty offset y
     * @param sx repeat x
     * @param sy repeat y
     * @param rotation rotation (in radians)
     * @param cx center x of rotation
     * @param cy center y of rotation
     */
    static transform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3;
    scale(sx: number, sy: number): Matrix3;
    rotate(theta: number): Matrix3;
    translate(tx: number, ty: number): Matrix3;
    applyVec2(v: Vec2): Vec2;
    applyPoint2(p: Point2): Point2;
    applyVec3(v: Vec3): Vec3;
    applyPoint3(p: Point3): Point3;
    at(index: number): number;
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


/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y)
 */
 class Vec2 {
    /**
     * the x value of this vector. Default is 0.
     */
    x: number | undefined;
    /**
     * the y value of this vector. Default is 0.
     */
    y: number | undefined;
    /**
     * creates a new 2D vector
     * @param x the x value of the vector
     * @param y the y value of the vector
     */
    constructor(x: number, y: number);
    /**
     * Calculates the dot product of this vector and given x and y
     * @param x the x value
     * @param y the y value
     */
    dot(x: number, y: number): number;
    /**
     * Calculates the dot product of this vector and v.
     * @see Vec2.dot()
     * @param v the other vector to calculate the dot product
     */
    dotWith(v: Vec2): number;
    /**
     * Calculates the cross product of this vector and given x and y.
     * Note that a 'cross-product' in 2D is not well-defined.
     * This function computes a geometric cross-product often used in 2D graphics
     * @param x the x value
     * @param y the y value
     */
    cross(x: number, y: number): number;
    /**
     * Calculates the cross product of this vector and v.
     * @see Vec2.cross()
     * @param v the other vector to calculate the cross product
     */
    crossWith(v: Vec2): number;
    /**
     * Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y).
     * If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
     */
    lengthSquared(): number;
    /**
     * Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).
     */
    length(): number;
    /**
     * Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
     */
    normalize(): Vec2;
    /**
     * Calculates the angle between this vector and given x and y by using the dot product.
     * @param x the x value
     * @param y the y value
     */
    angle(x: number, y: number): number;
    /**
     * Calculates the angle between this vector and given x and y by using the dot product.
     * @see Vec2.angle()
     * @param v the other vector to calculate the angle between
     */
    angleWith(v: Vec2): number;
    /**
     * Multiplies this vector by scalar s.
     * @param s the scalar
     */
    scale(s: number): Vec2;
    /**
     * Adds x and y to this vector
     * @param x the x value
     * @param y the y value
     */
    add(x: number, y: number): Vec2;
    /**
     * Adds v to this vector.
     * @see Vec2.add()
     * @param v the other vector to add
     */
    addWith(v: Vec2): Vec2;
    /**
     * Multiplies this vector by x and y.
     * @param x the x value
     * @param y the y value
     */
    multiply(x: number, y: number): Vec2;
    /**
     * Multiplies this vector by v.
     * @see Vec2.multiply()
     * @param v the other vector to multiply
     */
    multiplyWith(v: Vec2): Vec2;
    /**
     * Divides this vector by x and y.
     * @param x the x value
     * @param y the y value
     */
    divide(x: number, y: number): Vec2;
    /**
     * Divides this vector by v.
     * @see Vec2.divide()
     * @param v the other vector to divide
     */
    divideWith(v: Vec2): Vec2;
    /**
     * Subtracts x and y from this vector.
     * @param x the x value
     * @param y the y value
     */
    subtract(x: number, y: number): Vec2;
    /**
     * Subtracts v from this vector.
     * @see Vec2.subtract()
     * @param v the other vector to subtract
     */
    subtractWith(v: Vec2): Vec2;
    /**
     * Inverts this vector - i.e. sets x = -x and y = -y.
     */
    inverse(): Vec2;
    /**
     * Returns a new 2D vector with the same x and y values as this one.
     */
    clone(): Vec2;
    /**
     * Returns an perpendicular 2D vector in clockwise direction
     */
    perpendicularCW(): Vec2;
    /**
     * Returns an perpendicular 2D vector in counterclockwise direction
     */
    perpendicularCCW(): Vec2;
    /**
     * Returns a new 2D vector, where each component of the vector are set to a pseudo-random value between 0 and 1, excluding 1.
     */
    static random(): Vec2;
    applyMatrix3(m: Matrix3): Vec2;
    /**
     * Rotates this vector around center cx and cy by given angle in radians.
     * @param cx the x value of the center point around which to rotate.
     * @param cy the y value of the center point around which to rotate.
     * @param angle the angle to rotate, in radians.
     */
    rotateAround(cx: number, cy: number, angle: number): Vec2;
    /**
     * Rotates this vector around center by given angle in radians.
     * @param center the point around which to rotate.
     * @param angle the angle to rotate, in radians.
     */
    rotateAroundWith(center: Vec2, angle: number): Vec2;
    /**
     * Returns a unit vector for the x axis (1.0, 0.0)
     */
    static xAxis(): Vec2;
    /**
     * Returns a unit vector for the y axis (0.0, 1.0)
     */
    static yAxis(): Vec2;
    /**
     * Computes the squared distance from this vector to the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     */
    distanceSquared(x: number, y: number): number;
    /**
     * Computes the squared distance from this vector to the given vector p.
     * @param p the other vector
     * @see Vec2.distanceSquared()
     */
    distanceSquaredTo(p: Vec2): number;
    /**
     * Computes the distance from this vector to the given parameters.
     * @param x the x coordination
     * @param y the y coordination
     */
    distance(x: number, y: number): number;
    /**
     * Computes the distance from this vector to the given vector p.
     * @param p the other vector
     * @see Vec2.distance()
     */
    distanceTo(p: Vec2): number;
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


/**
 * A class representing a 4x4 matrix.
 * The most common use of a 4x4 matrix in 3D computer graphics is as a Transformation Matrix.
 * For an introduction to transformation matrices as used in WebGL.
 * @see https://en.wikipedia.org/wiki/Transformation_matrix
 * @see http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/
 */
 class Matrix4 {
    private elements;
    /**
     * Creates a new 4x4 matrix
     * @param n11
     * @param n12
     * @param n13
     * @param n14
     * @param n21
     * @param n22
     * @param n23
     * @param n24
     * @param n31
     * @param n32
     * @param n33
     * @param n34
     * @param n41
     * @param n42
     * @param n43
     * @param n44
     */
    constructor(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number);
    /**
     * creates a new matrix as the 4x4 identity matrix.
     */
    static identity(): Matrix4;
    /**
     * creates a new matrix where all elements are zero.
     */
    static zero(): Matrix4;
    /**
     * Creates a new Matrix4 with identical elements to this one.
     */
    clone(): Matrix4;
    /**
     * creates a new matrix with the rotation specified by the given Euler Angle.
     * @param x the x axis angle in radians
     * @param y the y axis angle in radians
     * @param z the z axis angle in radians
     */
    static rotationFromEuler(x: number, y: number, z: number): Matrix4;
    /**
     * Constructs a new rotation matrix, looking from eye towards target oriented by the up vector.
     * @param eye the eye vector
     * @param target the target vector
     * @param up the up vector
     */
    static lookAt(eye: Vec3, target: Vec3, up: Vec3): Matrix4;
    /**
     * Post-multiplies this matrix by m and returns a new matrix.
     * @param m the matrix to multiply
     */
    multiply(m: Matrix4): Matrix4;
    /**
     * Pre-multiplies this matrix by m and returns a new matrix.
     * @param m the matrix to multiply
     */
    premultiply(m: Matrix4): Matrix4;
    /**
     * multiplies both matrices with each other
     * @param a the first matrix
     * @param b the second matrix
     */
    static multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;
    /**
     * Multiplies every element of the matrix by the scalar value s and returns the result in a new matrix.
     * @param s the scalar to multiply
     */
    multiplyScalar(s: number): Matrix4;
    /**
    * Computes the determinant of this matrix.
    * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    */
    determinant(): number;
    /**
    * Transposes this matrix and returns the result in a new matrix.
    */
    transpose(): Matrix4;
    /**
     * Returns the inverse matrix for this matrix.
     * You can not invert a matrix with a determinant of zero.
     * If you attempt this, the method returns a zero matrix instead.
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     */
    inverse(): Matrix4;
    multiplyScale(x: number, y: number, z: number): Matrix4;
    multiplyScaleWith(v: Vec3): Matrix4;
    /**
     * creates a new matrix as a translation transform:
     * @param x the amount to translate in the X axis.
     * @param y the amount to translate in the Y axis.
     * @param z the amount to translate in the Z axis.
     */
    static translation(x: number, y: number, z: number): Matrix4;
    /**
     * creates a new matrix as a rotational transformation around the X axis by theta (θ) radians.
     * @param theta the x axis rotation in radians
     */
    static rotationX(theta: number): Matrix4;
    /**
    * creates a new matrix as a rotational transformation around the Y axis by theta (θ) radians.
    * @param theta the y axis rotation in radians
    */
    static rotationY(theta: number): Matrix4;
    /**
    * creates a new matrix as a rotational transformation around the Z axis by theta (θ) radians.
    * @param theta the z axis rotation in radians
    */
    static rotationZ(theta: number): Matrix4;
    /**
     * creates a new matrix as rotation transform around axis by theta radians.
     * @param x the x coordination of the rotation axis
     * @param y the y coordination of the rotation axis
     * @param z the z coordination of the rotation axis
     * @param angle Rotation angle in radians.
     */
    static rotationAxis(x: number, y: number, z: number, angle: number): Matrix4;
    /**
     * creates a new matrix as rotation transform around axis by theta radians.
     * @param axis Rotation axis, should be normalized.
     * @param angle Rotation angle in radians.
     * @see Matrix4.rotationAxis()
     */
    static rotationAxisWith(axis: Vec3, angle: number): Matrix4;
    /**
     * create a new matrix as scale transform
     * @param x the amount to scale in the X axis.
     * @param y the amount to scale in the Y axis.
     * @param z the amount to scale in the Z axis.
     */
    static scale(x: number, y: number, z: number): Matrix4;
    /**
     * create a new matrix as scale transform
     * @param v the scale vector
     * @see Matrix4.scale()
     */
    static scaleWith(v: Vec3): Matrix4;
    /**
     * create a new matrix as a shear transform
     * @param x the amount to shear in the X axis.
     * @param y the amount to shear in the Y axis.
     * @param z the amount to shear in the Z axis.
     */
    static shear(x: number, y: number, z: number): Matrix4;
    /**
     * create a new matrix as a shear transform
     * @param v the shear vector
     * @see Matrix4.shear()
     */
    static shearWith(v: Vec3): Matrix4;
    /**
     * Creates a new perspective projection matrix.
     * @param left
     * @param right
     * @param top
     * @param bottom
     * @param near
     * @param far
     */
    static perspective(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
    /**
     * Creates a new orthographic projection matrix.
     * @param left
     * @param right
     * @param top
     * @param bottom
     * @param near
     * @param far
     */
    static orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
    /**
    * Applies this Matrix transform to the given vector v.
    * @param v the vector to apply
    */
    applyVec3(v: Vec3): Vec3;
    /**
    * Applies this Matrix transform to the given point p.
    * @param p the point to apply
    */
    applyPoint3(p: Point3): Point3;
    /**
     * returns the element value at given index
     * @param index the index for the element
     */
    at(index: number): number;
    /**
     * creates a new matrix to the transformation composed of position, quaternion and scale.
     * @param position the position
     * @param quaternion the quaternion
     * @param scale the scale
     */
    static compose(position: Vec3, quaternion: Quaternion, scale: Vec3): Matrix4;
    /**
     * creates a new rotation matrix from the the rotation specified by the given quaternion q.
     * The rest of the matrix is set to the identity.
     * @param q the quaternion for the rotation
     * @see https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion
     */
    static rotationFromQuaternion(q: Quaternion): Matrix4;
    /**
     * Gets the maximum scale value of the 3 axes.
     */
    maxScaleOnAxis(): number;
    /**
     * Returns the euler angles represented by this matrix rotation for the three axes in radians. (Order: XYZ)
     */
    toEuler(): Vec3;
}


/**
 * Implementation of a quaternion (Hamilton's hypercomplex numbers).
 * Quaternions are used to represent rotations.
 * Quaternions are generally represented in the form:
 * <code>x + y*i + z*j + w*k</code>
 * @see http://mathworld.wolfram.com/Quaternion.html
 */
 class Quaternion {
    /** x coordinate */
    x: number | undefined;
    /** y coordinate */
    y: number | undefined;
    /** z coordinate */
    z: number | undefined;
    /** w coordinate */
    w: number | undefined;
    /**
     * creates a new quaternion
     * @param x x coordinate
     * @param y y coordinate
     * @param z z coordinate
     * @param w w coordinate
     */
    constructor(x: number, y: number, z: number, w: number);
    /**
     * creates a new quaternion (0.0, 0.0, 0.0, 1.0)
     */
    static zero(): Quaternion;
    /**
     * Creates a new Quaternion with identical x, y, z and w properties to this one.
     */
    clone(): Quaternion;
    /**
     * creates a new quaternion from the rotation specified by the given euler angle in order (XYZ).
     * @param x the angle of the x axis in radians
     * @param y the angle of the y axis in radians
     * @param z the angle of the z axis in radians
     */
    static fromEuler(x: number, y: number, z: number): Quaternion;
    /**
     * create a new quaternion from the rotation specified by the given euler angle from v.
     * @param v the angles in radians
     * @see Quaternion.fromEuler()
     */
    static fromEulerWith(v: Vec3): Quaternion;
    /**
     * create a new quaternion from rotation specified by axis and angle.
     * @param x the x coordination of the axis
     * @param y the y coordination of the axis
     * @param z the z coordination of the axis
     * @param angle the angle in radians
     */
    static fromAxisAngle(x: number, y: number, z: number, angle: number): Quaternion;
    /**
     * create a new quaternion from rotation specified by axis and angle.
     * @param v the axis is assumed to be normalized
     * @param angle the angle in radians
     * @see Quaternion.fromAxisAngle()
     */
    static fromAxisAngleWith(v: Vec3, angle: number): Quaternion;
    private static fromMatrix;
    /**
     * creates a new quaternion from the given matrix
     * @param m the matrix to create the quaternion
     */
    static fromMatrix3(m: Matrix3): Quaternion;
    /**
     * creates a new quaternion from the given matrix
     * @param m the matrix to create the quaternion
     */
    static fromMatrix4(m: Matrix4): Quaternion;
    /**
     * creates a new quaternion with a rotation to rotate a vector from the direction vector vFrom to direction vector vTo
     * @param vFrom the from vector is assumed to be normalized
     * @param vTo  the to vector is assumed to be normalized
     */
    static fromUnitVectors(vFrom: Vec3, vTo: Vec3): Quaternion;
    /**
     * Returns the angle between this quaternion and quaternion q in radians.
     * @param q the other quaternion
     */
    angleTo(q: Quaternion): number;
    /**
     * creates a new quaternion to the identity quaternion.
     * the quaternion represents <b>no rotation</b>.
     */
    static identity(): Quaternion;
    /**
     * Inverts this quaternion - calculates the conjugate. The quaternion is assumed to have unit length.
     */
    inverse(): Quaternion;
    /**
     * Returns the rotational conjugate of this quaternion.
     * The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     */
    conjugate(): Quaternion;
    /**
     * Calculates the dot product of quaternions q and this one.
     * @param q the other quaternion
     */
    dot(q: Quaternion): number;
    /**
     * Computes the squared Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector.
     */
    lengthSquared(): number;
    /**
     * Computes the Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector.
     */
    length(): number;
    /**
     * Normalizes this quaternion - that is,
     * calculated the quaternion that performs the same rotation as this one,
     * but has length equal to 1.
     */
    normalize(): Quaternion;
    /**
     * Multiplies this quaternion by q and returns a new quaternion.
     * @param q the other quaternion
     */
    multiply(q: Quaternion): Quaternion;
    /**
     * Pre-multiplies this quaternion by q and returns a new quaternion.
     * @param q the other quaternion
     */
    premultiply(q: Quaternion): Quaternion;
    /**
     * Multiplies both quaternions and returns a new quaternion.
     * @param a first quaternion
     * @param b second quaternion
     */
    static multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion;
    /**
     * Handles the spherical linear interpolation between quaternions.
     * t represents the amount of rotation between this quaternion (where t is 0) and q (where t is 1).
     * The result is return as a new quaternion.
     * @param q The other quaternion rotation
     * @param t interpolation factor in the closed interval [0, 1].
     */
    slerp(q: Quaternion, t: number): Quaternion;
    /**
     * Applies this Quaternion transform to the given vector v.
     * @param v the vector to apply
     */
    applyVec3(v: Vec3): Vec3;
    /**
    * Applies this Quaternion transform to the given point p.
    * @param p the point to apply
    */
    applyPoint3(p: Point3): Point3;
}



/**
 * Creates a 2D curve in the shape of an ellipse.
 * Setting the xRadius equal to the yRadius will result in a circle.
 */
 class EllipseCurve2 extends Curve2 {
    private readonly xCenter;
    private readonly yCenter;
    private readonly xRadius;
    private readonly yRadius;
    private readonly startAngle;
    private readonly endAngle;
    private readonly clockwise?;
    private readonly rotation?;
    /**
     * Creates the 2d curve in the shape of an ellipse
     * @param xCenter The X center of the ellipse. Default is 0.
     * @param yCenter The Y center of the ellipse. Default is 0.
     * @param xRadius The radius of the ellipse in the x direction. Default is 1.
     * @param yRadius The radius of the ellipse in the y direction. Default is 1.
     * @param startAngle The start angle of the curve in radians starting from the positive X axis. Default is 0.
     * @param endAngle The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI.
     * @param clockwise Whether the ellipse is drawn clockwise. Default is false.
     * @param rotation The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is 0.
     */
    constructor(xCenter: number, yCenter: number, xRadius: number, yRadius: number, startAngle: number, endAngle: number, clockwise?: boolean, rotation?: number);
    /**
     * Creates the 2d curve in the shape of an ellipse
     * @param center the center of the ellipse
     * @param radius the radius of the ellipse
     * @param startAngle The start angle of the curve in radians starting from the positive X axis. Default is 0.
     * @param endAngle The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI.
     * @param clockwise Whether the ellipse is drawn clockwise. Default is false.
     * @param rotation The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Default is 0.
     * @see EllipseCurve2()
     */
    static ellipseWith(center: Vec2, radius: Vec2, startAngle: number, endAngle: number, clockwise?: boolean, rotation?: number): EllipseCurve2;
    /**
     * Returns a vector for a given position on the curve.
     * @param t A position on the curve
     */
    getPoint(t: number): Vec2;
}


/**
 * Extension class for a curve with additional interpolation function for the 2d space.
 */
 class Curve2 extends Curve {
    constructor();
    computeFrames(segments: number): CurveFrame2[];
}


/**
 * A base class for creating a Curve object that contains methods for interpolation.
 */
 class Curve {
    private lengths;
    private static APPROX_DELTA;
    private static ARC_LENGTH_DIVISIONS;
    /**
     * This constructor creates a new Curve.
     */
    constructor();
    /**
     * Returns a vector for a given position on the curve.
     * @param t  A position on the curve. Must be in the range [ 0, 1 ].
     */
    getPoint(t: number): Vec2 | Vec3;
    /**
     * Returns a vector for a given position on the curve according to the arc length.
     * @param u  A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
     */
    getPointAt(u: number): Vec2 | Vec3;
    /**
     * Get sequence of points using getPoint( t )
     * @see Curve.getPoint()
     * @param divisions number of pieces to divide the curve into. Default is 5.
     */
    getPoints(divisions?: number): (Vec2 | Vec3)[];
    /**
     * Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).
     * @param divisions number of pieces to divide the curve into. Default is 5.
     */
    getSpacedPoints(divisions: number): (Vec2 | Vec3)[];
    /**
     * Get total curve arc length.
     */
    getLength(): number;
    /**
     * Get list of cumulative segment lengths.
     * @param divisions number of pieces to cumulative segment of the curve. Default is 200.
     */
    getLengths(divisions?: number): number[];
    /**
     * Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
     * u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.
     * @param u u in the range [0, 1]
     * @param distance
     */
    getUtoTmapping(u: number, distance?: number): number;
    /**
     * Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
     * two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.
     * @param t A position on the curve. Must be in the range [ 0, 1 ].
     */
    getTangent(t: number): Vec2 | Vec3;
    /**
     * Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.
     * @param u A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
     */
    getTangentAt(u: number): Vec2 | Vec3;
}



 class CurveFrame2 {
    /** direction vector of the curve */
    tangent: Vec2;
    /** position on the curve for the frame */
    position: Vec2;
    constructor(position: Vec2, tangent: Vec2);
    rotation(): number;
}


/**
 * Based on an optimized c++ solution in
 * - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
 * - http://ideone.com/NoEbVM
 *
 * This CatmullCubicPolynomial class could be used for reusing some variables and calculations,
 * but for squishy curve use, it could be possible inlined and flatten into a single function call.
 */
 class CatmullCubicPolynomial {
    c0: number;
    c1: number;
    c2: number;
    c3: number;
    constructor();
    init(x0: number, x1: number, t0: number, t1: number): void;
    initCatmullRom(x0: number, x1: number, x2: number, x3: number, tension: number): void;
    initNonuniformCatmullRom(x0: number, x1: number, x2: number, x3: number, dt0: number, dt1: number, dt2: number): void;
    calculate(t: number): number;
}



/**
 * Centripetal CatmullRom Curve - which is useful for avoiding
 * cusps and self-intersections in non-uniform catmull rom curves.
 * @see http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
 */
 class CatmullRomCurve3 extends Curve3 {
    private readonly points;
    private readonly closed?;
    private readonly type?;
    private readonly tension?;
    constructor(points: Vec3[], closed?: boolean, type?: CatmullRomType, tension?: number);
    getPoint(t: number): Vec3;
}




/**
 * Extension class for a curve with additional interpolation function for the 3d space.
 */
 class Curve3 extends Curve {
    constructor();
    /**
     * Generates the Frenet Frames. Requires a curve definition in 3D space.
     * @param segments number of frames to compute
     * @param closed true if the curve is closed
     * @see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
     */
    computeFrenetFrames(segments: number, closed?: boolean): CurveFrame3[];
}


 class CurveFrame3 {
    /** the normal vector */
    normal: Vec3;
    /** direction vector of the curve */
    tangent: Vec3;
    /** position on the curve for the frame */
    position: Vec3;
    /** the cross vector from tangent and normal */
    binormal: Vec3;
    constructor(position: Vec3, tangent: Vec3);
    /**
     * Computes the three euler angles from binormal, tangent and normal
     */
    rotation(): Vec3;
}



/**
 * Create a smooth 2d spline curve from a series of points.
 * Internally this uses Mathf.catmullRom() to create the curve.
 */
 class SplineCurve2 extends Curve2 {
    private readonly points;
    /**
     * Creates the spline curve for 2d
     * @param points An array of Vec2 points that define the curve.
     */
    constructor(points: Vec2[]);
    getPoint(t: number): Vec2;
}



/**
 * A two dimensional surface that extends infinitely in 3d space,
 * represented in Hessian normal form by a unit length normal vector and a constant.
 */
 class Plane {
    /** a unit length Vec3 defining the normal of the plane */
    normal: Vec3 | undefined;
    /** the signed distance from the origin to the plane */
    constant: number | undefined;
    /**
     * Creates a new Plane
     * @param normal the unit length Vec3 defining the normal of the plane
     * @param constant the signed distance from the origin to the plane
     */
    constructor(normal: Vec3, constant: number);
    /**
     * Returns a new plane with the same normal and constant as this one.
     */
    clone(): Plane;
    /**
     * Negates both the normal vector and the constant.
     */
    negate(): Plane;
    /**
     * Returns the signed distance from the point to the plane.
     * @param point the point to get the distance to
     */
    distanceToPoint(point: Vec3): number;
    /**
     * Projects a point onto the plane.
     * @param point the Vec3 to project onto the plane.
     */
    projectPoint(point: Vec3): Vec3;
    /**
     * Translates the plane by the distance defined by the offset vector.
     * Note that this only affects the plane constant and will not affect the normal vector.
     * @param offset the offset to translate
     */
    translate(offset: Vec3): Plane;
    /**
     * Returns a Vector3 coplanar to the plane, by calculating the projection of the normal vector at the origin onto the plane.
     */
    coplanarPoint(): Vec3;
    /**
     * returns the normal for the given point
     * @param point the point to get the normal at
     */
    normalAt(point: Vec3): Vec3;
    /**
     * Returns the signed distance from the sphere to the plane.
     * @param sphere the sphere to get the distance to
     */
    distanceToSphere(sphere: Sphere): number;
    /**
     * checks if the sphere intersects with the plane
     * @param sphere the sphere to check
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Intersect this Ray with this Plane, returning the intersection point or undefined if there is no intersection.
     * @param ray the ray to intersect with this plane
     */
    intersectRay(ray: Ray): Vec3 | undefined;
    /**
     * Creates a new plane as defined by a normal and an arbitrary coplanar point.
     * @param n a unit length Vec3 defining the normal of the plane.
     * @param point the coplanar point
     */
    static fromNormalAndCoplanarPoint(n: Vec3, point: Vec3): Plane;
    /**
     * Defines the plane based on the 3 provided points.
     * The winding order is assumed to be counter-clockwise, and determines the direction of the normal.
     * @param a first point on the plane.
     * @param b second point on the plane.
     * @param c third point on the plane.
     */
    static fromCoplanarPoints(a: Vec3, b: Vec3, c: Vec3): Plane;
    /**
     * Apply a Matrix4 to the plane.
     * The matrix must be an affine, homogeneous transform.
     * @param m the Matrix4 to apply.
     * @param optionalNormalMatrix pre-computed normal Matrix3 of the Matrix4 being applied.
     */
    applyMatrix4(m: Matrix4, optionalNormalMatrix?: Matrix3): Plane;
}


/**
 * A ray that emits from an origin in a certain direction.
 * This is used by the Raycaster to assist with raycasting.
 */
 class Ray {
    /** the origin of the Ray */
    origin: Vec3 | undefined;
    /** The direction of the Ray */
    direction: Vec3 | undefined;
    /**
     * Creates a new Ray.
     * @param origin the origin of the Ray
     * @param direction The direction of the Ray
     */
    constructor(origin: Vec3, direction: Vec3);
    /**
     * Creates a new Ray with identical origin and direction to this one.
     */
    clone(): Ray;
    /**
     * Get a Vec3 that is a given distance along this Ray.
     * @param t the distance along the Ray to retrieve a position for.
     */
    at(t: number): Vec3;
    /**
     * The Vec3 to look at.
     * @param v Adjusts the direction of the ray to point at the vector in world coordinates.
     */
    lookAt(v: Vec3): Ray;
    /**
     * Shift the origin of this Ray along its direction by the distance given.
     * @param t The distance along the Ray to interpolate.
     */
    recast(t: number): Ray;
    /**
     * Get the point along this Ray that is closest to the Vec3 provided.
     * @param point  the point to get the closest approach to.
     */
    closestPointToPoint(point: Vec3): Vec3;
    /**
     * Get the squared distance of the closest approach between the Ray and the Vec3.
     * @param point the Vec3 to compute a distance to.
     */
    distanceSquaredToPoint(point: Vec3): number;
    /**
     * Transform this Ray by the Matrix4.
     * @param m the Matrix4 to apply to this Ray.
     */
    applyMatrix4(m: Matrix4): Ray;
    /**
     * Transform this Ray by the Quaternion.
     * @param q the Quaternion to apply to this Ray.
     */
    applyQuaternion(q: Quaternion): Ray;
    /**
     * Get the distance from origin to the Plane, or undefined if the Ray doesn't intersect the Plane.
     * @param plane the Plane to get the distance to.
     */
    distanceToPlane(plane: Plane): number | undefined;
    /**
     * Intersect this Ray with a Plane, returning the intersection point or undefined if there is no intersection.
     * @param plane the Plane to intersect with.
     */
    intersectPlane(plane: Plane): Vec3 | undefined;
    /**
     * Return true if this Ray intersects with the Plane.
     * @param plane  the Plane to intersect with.
     */
    intersectsPlane(plane: Plane): boolean;
    /**
     * Intersect this Ray with a Sphere, returning the intersection point or undefined if there is no intersection.
     * @param sphere the Sphere to intersect with.
     */
    intersectSphere(sphere: Sphere): Vec3 | undefined;
    /**
     * Return true if this Ray intersects with the Sphere.
     * @param sphere  the Sphere to intersect with.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Intersect this Ray with a triangle, returning the intersection point or undefined if there is no intersection.
     * @param triangle the triangle to check
     * @param backfaceCulling whether to use backface culling
     * @see http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
     */
    intersectTriangle(triangle: Triangle, backfaceCulling?: boolean): Vec3 | undefined;
    /**
     * Creates a new ray from the point as reflect of this direction vector off of plane orthogonal to normal.
     * Normal is assumed to have unit length.
     * @param point the point for the origin
     * @param normal the normal to the reflecting plane
     */
    reflect(point: Vec3, normal: Vec3): Ray;
}


/**
 * A sphere defined by a center and radius.
 */
 class Sphere {
    /** A Vec3 defining the center of the sphere */
    center: Vec3 | undefined;
    /** The radius of the sphere. */
    radius: number | undefined;
    /**
     * Creates a new Sphere.
     * @param center the center of the sphere.
     * @param radius the radius of the sphere
     */
    constructor(center: Vec3, radius: number);
    /**
     * Checks to see if the sphere contains the provided point inclusive of the surface of the sphere.
     * @param point the Vec3 to be checked
     */
    containsPoint(point: Vec3): boolean;
    /**
     * Returns the closest distance from the boundary of the sphere to the point.
     * If the sphere contains the point, the distance will be negative.
     * @param point the Vec3 to get the distance to
     */
    distanceToPoint(point: Vec3): number;
    /**
     * Determines whether or not this sphere intersects a given plane.
     * @param plane Plane to check for intersection against.
     */
    intersectsPlane(plane: Plane): boolean;
    /**
     * Intersect this Ray with this Sphere, returning the intersection point or undefined if there is no intersection.
     * @param ray the ray to intersect with this sphere
     */
    intersectRay(ray: Ray): Vec3 | undefined;
    /**
     * Translate the sphere's center by the provided offset Vec3.
     * @param offset the offset to translate the center
     */
    translate(offset: Vec3): Sphere;
    /**
     * Transforms this sphere with the provided Matrix4.
     * @param m the Matrix4 to apply
     */
    applyMatrix4(m: Matrix4): Sphere;
    /**
     * Returns the normal for the given point
     * @param point the point to get the normal for
     */
    normalAt(point: Vec3): Vec3;
}



/**
 * A geometric triangle as defined by three Vec3s representing its three corners.
 */
 class Triangle {
    /** the first corner of the triangle */
    a: Vec3 | undefined;
    /** the second corner of the triangle */
    b: Vec3 | undefined;
    /**  the final corner of the triangle */
    c: Vec3 | undefined;
    /**
     * Creates a new Triangle.
     * @param a the first corner of the triangle
     * @param b the second corner of the triangle
     * @param c the final corner of the triangle
     */
    constructor(a: Vec3, b: Vec3, c: Vec3);
    /**
     * Returns a new triangle with the same a, b and c properties as this one.
     */
    clone(): Triangle;
    static calculateNormal(a: Vec3, b: Vec3, c: Vec3): Vec3;
    /**
     * the method to calculate barycentric coordinates
     * @param point
     * @param a
     * @param b
     * @param c
     * @see http://www.blackpawn.com/texts/pointinpoly/default.html
     */
    static calculateBarycoord(point: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3;
    static isContainsPoint(point: Vec3, a: Vec3, b: Vec3, c: Vec3): boolean;
    static calculateUV(point: Vec3, a: Vec3, b: Vec3, c: Vec3, uv1: Vec3, uv2: Vec3, uv3: Vec3): Vec3;
    static frontFacing(a: Vec3, b: Vec3, c: Vec3, direction: Vec3): boolean;
    /**
     * Return the area of the triangle.
     */
    getArea(): number;
    /**
     * Calculate the midpoint of the triangle.
     */
    getMidpoint(): Vec3;
    /**
     * Calculate the normal vector of the triangle at the given point
     * @param point the point to calculate the normal
     */
    normalAt(point: Vec3): Vec3;
    /**
     * Calculate a plane based on the triangle.
     */
    getPlane(): Plane;
    /**
     * Return a barycentric coordinate from the given vector.
     * @param point the point for the barycentric coordinate
     */
    getBarycoord(point: Vec3): Vec3;
    getUV(point: Vec3, uv1: Vec3, uv2: Vec3, uv3: Vec3): Vec3;
    /**
     * Returns true if the passed point, when projected onto the plane of the triangle, lies within the triangle.
     * @param point the point to check
     */
    containsPoint(point: Vec3): boolean;
    /**
     * checks if the triangle is front facing
     * @param direction the direction to check
     */
    isFrontFacing(direction: Vec3): boolean;
    /**
     * Returns the closest point on the triangle to point.
     * @param point the point to get the closest to
     */
    closestPointToPoint(point: Vec3): Vec3;
    /**
     * Intersect this Ray with this Triangle, returning the intersection point or undefined if there is no intersection.
     * @param ray the ray to intersect with this triangle
     */
    intersectRay(ray: Ray): Vec3 | undefined;
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
    transformPoint(p: Point2): Point2;
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
 const TWO_PI: number


/**
 * Clamps the given value between the given minimum float and maximum float values.
 * Returns the given value if it is within the min and max range.
 * @param min The minimum floating point value to compare against.
 * @param value The floating point value to restrict inside the range defined by the min and max values.
 * @param max The maximum floating point value to compare against.
 */
 function clamp(min: number, value: number, max: number): number;

/**
 * The method converts an angle measured in radians to an approximately equivalent angle measured in degrees.
 * The conversion from radians to degrees is generally inexact; users should not expect cos(toRadians(90.0)) to exactly equal 0.0.
 * @param rad an angle, in radians
 */
 function toDegrees(rad: number): number;

/**
 * The method converts an angle measured in degrees to an approximately equivalent angle measured in radians.
 * The conversion from degrees to radians is generally inexact.
 * @param deg an angle, in degrees
 */
 function toRadians(deg: number): number;

/**
 * The method normalize the given radians to be between [ 0.0, 2*PI ]
 * @param rad the angle, in radians
 */
 function normalizeRadians(rad: number): number;

/**
 * The method normalize the given degrees to be between [ 0.0, 360.0 ]
 * @param deg the angle, in degrees
 */
 function normalizeDegrees(deg: number): number;

/**
 * The method compares the given float point number with zero based on an epsilon
 * @param x the float point number to compare
 */
 function closeZero(x: number): boolean;

/**
 * The method compares two given float point number to check if there are equals based on an epsilon
 * @param a the first float point number to compare
 * @param b the second float point number to compare
 */
 function closeEquals(a: number, b: number): boolean;

/**
 * Perform the cubic Catmull-Rom-interpolation
 * @param t interpolation weight.
 * @param p0 The first point
 * @param p1 The second point
 * @param p2 The third point
 * @param p3 The fourth point
 */
 function catmullRom(t: number, p0: number, p1: number, p2: number, p3: number): number;


/**
 * An instance of this class is used to generate pseudorandom numbers with `Math.random`.
 */
 class Random {
    /**
     * Returns a pseudorandom number between 0 and 1.
     */
    float(): number;
    /**
     * Returns a pseudorandom number between 0 and and given `n`.
     * @param n the upper bound (exclusive). Must be positive.
     */
    intN(n: number): number;
    /**
     * Return a random element from the given array or `undefined` if the array is empty
     * @param array the array to choice a random element from
     */
    choice<T>(array: T[]): T | undefined;
    /**
     * Returns a random string
     */
    rndStr(): string;
    /**
     * Returns a random string with the given length
     * @param n the length of random string to create
     */
    randomString(n: number): string;
}



}
declare namespace SquishyTypes {


class Squishy {
    context: any;
    io: SquishyIO;
    view3d: View3D;
    progress(value: number): void;
}


 class SquishyIO {
    static NEWLINE: string;
    static DELIMITER: string;
    static XML_MIME_TYPE: string;
    static NF: Intl.NumberFormat;
    csvStringify(data: (unknown[][]) | undefined, toString?: (x: unknown) => string, delimiter?: string, newline?: string): string;
    csvParse(content: string | undefined, delimiter?: string): string[][];
    /**
     * parse the given data as stl ascii or binary file
     * @param data the data to parse
     * @param onProgress (optional) the callback for the progress completed
     * @see https://en.wikipedia.org/wiki/STL_(file_format)
     */
    stlParse(data: ArrayBuffer, onProgress?: (p: number) => void): STLResult;
    /**
     * converts the given number to a string based on the local browser language formatting
     * @param x the number to format
     */
    numberToLocal(x: number): string;
}

class STLResult {
    normals: number[];
    vertices: number[];
    colors: number[] | undefined;
}



 class View3D {
    View3DAxes: typeof View3DAxes;
    View3DGrid: typeof View3DGrid;
    View3DLines: typeof View3DLines;
    View3DPoints: typeof View3DPoints;
    View3DGeometry: typeof View3DGeometry;
}


 class View3DAxes extends View3DObject {
    size: number | undefined;
    constructor(position?: View3DVec3, size?: number, rotation?: View3DVec3);
    static origin(size?: number): View3DAxes;
}


 class View3DObject {
    type: View3DType | undefined;
    scale: View3DVec3 | undefined;
    position: View3DVec3 | undefined;
    rotation: View3DVec3 | undefined;
    constructor(position?: View3DVec3, rotation?: View3DVec3, scale?: View3DVec3);
}

 const View3DTypes: View3DType[]


class View3DVec3 {
    x: number;
    y: number;
    z: number;
}



 class View3DGeometry extends View3DObject {
    /** the the color for the material */
    color: string | undefined;
    /** the the color for each face */
    colors: number[] | undefined;
    /** if true, the object is shown as wireframe */
    wireframe: boolean | undefined;
    /** the normals */
    normals: number[] | undefined;
    /** the vertices */
    vertices: number[] | undefined;
    constructor(vertices: number[], normals?: number[], position?: View3DVec3, rotation?: View3DVec3);
}



 class View3DGrid extends View3DObject {
    size: number | undefined;
    color: string | undefined;
    divisions: number | undefined;
    constructor(size: number, divisions: number, color?: string, position?: View3DVec3, rotation?: View3DVec3);
}



 class View3DLines extends View3DObject {
    color: string | undefined;
    points: View3DVec3[] | undefined;
    constructor(points: View3DVec3[], color?: string, position?: View3DVec3, rotation?: View3DVec3);
}



 class View3DPoints extends View3DObject {
    color: string | undefined;
    points: View3DVec3[] | undefined;
    constructor(points: View3DVec3[], color?: string, position?: View3DVec3, rotation?: View3DVec3);
}


}
declare namespace PluginsTypes {


 class Plugins {
    /**
     * import from dayjs to parses, validates, manipulates, and displays dates
     * @see https://github.com/iamkun/dayjs
     */
    dayjs: typeof dayjs;
    /**
     * import from xmldom, which allows to parse xml or dom files
     * @see https://github.com/jindw/xmldom
     */
    xmldom: any;
    /**
     * import from pngjs, which is a simple PNG encoder/decoder in javascript
     * @see https://github.com/lukeapage/pngjs
     */
    pngjs: any;
    /**
     * import from buffer, which is the buffer module from node.js, for the browser.
     * @see https://github.com/feross/buffer
     * @see https://nodejs.org/api/buffer.html
     */
    buffer: typeof buffer;
}


}
declare const Squishy: SquishyTypes.Squishy
declare const Plugins: PluginsTypes.Plugins