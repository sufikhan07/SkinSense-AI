def generate_recommendation(
    skin_type: str,
    concern: str,
    sensitivity: str,
):
    recommendations = []

    if skin_type == "oily":
        recommendations.append(
            "Use a gentle foaming cleanser and lightweight moisturizer."
        )

    elif skin_type == "dry":
        recommendations.append(
            "Use a gentle hydrating cleanser and a rich moisturizer."
        )

    elif skin_type == "combination":
        recommendations.append(
            "Use a gentle cleanser and lightweight moisturizer."
        )

    else:
        recommendations.append(
            "Use a gentle cleanser and balanced moisturizer."
        )

    if concern == "acne":
        recommendations.append(
            "Consider ingredients commonly used for acne-prone skin, such as salicylic acid."
        )

    elif concern == "dark-spots":
        recommendations.append(
            "Consider a routine focused on sunscreen and gentle brightening ingredients."
        )

    elif concern == "dryness":
        recommendations.append(
            "Focus on hydration and barrier-supporting ingredients."
        )

    elif concern == "redness":
        recommendations.append(
            "Prioritize gentle, fragrance-free skincare and barrier support."
        )

    elif concern == "fine-lines":
        recommendations.append(
            "Prioritize daily sunscreen and a consistent skin-supporting routine."
        )

    if sensitivity == "high":
        recommendations.append(
            "Because your skin is highly sensitive, introduce new products gradually."
        )

    return recommendations
