#version 330

uniform sampler2DShadow shadowMap;
uniform sampler2D texUnit;
uniform vec4 diffuse;
uniform int texCount;

in vec4 projShadowCoord;
in vec3 normalV;
in vec2 texCoordV;
in vec3 lightDir;

out vec4 outColor;

void main() {

    vec4 color, diff;

    if(texCount != 2) {

        diff = texture(texUnit, texCoordV);
    } else {
        diff = diffuse;
    }

    color = diff * 0.25;
    vec3 n = normalize(normalV);
    float Ndotl = max(0.0, dot(n, lightDir));
    float shadow = textureProj(shadowMap, projShadowCoord / projShadowCoord.w);

    if(Ndotl > 0) {

        color += diff * Ndotl * shadow;
    }
    outColor = color;

}