def generate_recommendation(
    skin_type: str,
    concerns: list[str],
    sensitivity: str,
    acne_frequency: str,
    rash_frequency: str,
    sunscreen_use: str,
    age: int,
):
    focus_areas: list[str] = []
    ingredients: list[dict] = []
    products: list[dict] = []

    def add_focus(name: str):
        if name not in focus_areas:
            focus_areas.append(name)

    def add_ingredient(
        name: str,
        tag: str,
        description: str,
    ):
        if not any(
            item["name"] == name
            for item in ingredients
        ):
            ingredients.append(
                {
                    "name": name,
                    "tag": tag,
                    "description": description,
                }
            )

    # --------------------------------------------------
    # SKIN-TYPE LOGIC
    # --------------------------------------------------

    if skin_type == "Oily":
        add_focus("Oil control")

        add_ingredient(
            "Niacinamide",
            "Oil control",
            (
                "Useful for supporting the skin barrier "
                "while helping manage visible shine."
            ),
        )

        cleanser_detail = (
            "Choose a gentle gel or low-stripping foaming cleanser. "
            "Avoid cleansing so aggressively that the skin feels tight."
        )

        moisturizer_detail = (
            "Use a lightweight, non-greasy moisturizer that still "
            "supports the skin barrier."
        )

    elif skin_type == "Dry":
        add_focus("Deep hydration")
        add_focus("Barrier support")

        add_ingredient(
            "Hyaluronic Acid",
            "Hydration",
            (
                "A humectant commonly used to help attract and retain "
                "water in the skin."
            ),
        )

        add_ingredient(
            "Ceramides",
            "Barrier",
            (
                "Barrier-supporting lipids that are especially useful "
                "when skin feels dry or compromised."
            ),
        )

        add_ingredient(
            "Glycerin",
            "Hydration",
            (
                "A classic humectant that helps improve moisture retention."
            ),
        )

        cleanser_detail = (
            "Choose a creamy, fragrance-free, non-stripping cleanser "
            "that leaves the skin comfortable after washing."
        )

        moisturizer_detail = (
            "Use a richer cream containing barrier-supportive or "
            "moisture-binding ingredients."
        )

    elif skin_type == "Combination":
        add_focus("Balanced hydration")

        add_ingredient(
            "Niacinamide",
            "Balance",
            (
                "Can fit combination skin because it supports the barrier "
                "without requiring a heavy routine."
            ),
        )

        cleanser_detail = (
            "Use a balanced gentle cleanser and avoid aggressively "
            "stripping oilier areas."
        )

        moisturizer_detail = (
            "Use lightweight hydration across the face and add richer "
            "moisture only where needed."
        )

    else:
        add_focus("Daily maintenance")

        cleanser_detail = (
            "Use a gentle everyday cleanser that leaves the skin comfortable."
        )

        moisturizer_detail = (
            "Use a balanced daily moisturizer appropriate for your skin."
        )

    # --------------------------------------------------
    # ACNE LOGIC
    # --------------------------------------------------

    acne_selected = "Acne" in concerns

    if acne_selected:
        add_focus("Breakout control")

        # Frequent acne -> benzoyl peroxide becomes more relevant
        if acne_frequency in ["Often", "Very often"]:
            add_ingredient(
                "Benzoyl Peroxide",
                "Inflamed breakouts",
                (
                    "Commonly used for acne and inflammatory pimples. "
                    "It can be drying, so lower-strength products and "
                    "gradual introduction are usually more tolerable."
                ),
            )

        # Mild / occasional acne -> salicylic acid
        if acne_frequency in [
            "Rarely",
            "Sometimes",
            "Often",
        ]:
            add_ingredient(
                "Salicylic Acid",
                "Clogged pores",
                (
                    "A beta-hydroxy acid often used to help unclog pores "
                    "and address blackheads, whiteheads and congestion."
                ),
            )

        # Azelaic acid works well as a multi-purpose acne/dark-mark ingredient
        add_ingredient(
            "Azelaic Acid",
            "Acne + marks",
            (
                "A useful option for acne-prone skin that can also help "
                "with post-acne dark marks and visible inflammation."
            ),
        )

    # --------------------------------------------------
    # FINE LINES / RETINOL LOGIC
    # --------------------------------------------------

    if "Fine lines" in concerns:
        add_focus("Fine-line support")

        if (
            sensitivity != "High"
            and rash_frequency not in ["Often", "Very often"]
            and "Redness" not in concerns
        ):
            add_ingredient(
                "Retinol",
                "Fine lines",
                (
                    "A vitamin-A derivative commonly used for mild fine lines, "
                    "texture and uneven tone. Introduce gradually and use "
                    "sun protection consistently."
                ),
            )
        else:
            add_ingredient(
                "Peptides",
                "Gentle aging support",
                (
                    "A gentler support option when irritation or sensitivity "
                    "makes retinoids a poor first choice."
                ),
            )

    # --------------------------------------------------
    # DRYNESS
    # --------------------------------------------------

    if "Dryness" in concerns:
        add_focus("Barrier repair")

        add_ingredient(
            "Hyaluronic Acid",
            "Hydration",
            (
                "Helps support hydration by attracting water into the "
                "upper layers of the skin."
            ),
        )

        add_ingredient(
            "Ceramides",
            "Barrier",
            (
                "Especially useful when dryness is related to a weakened "
                "or easily irritated skin barrier."
            ),
        )

        add_ingredient(
            "Glycerin",
            "Moisture retention",
            (
                "A reliable humectant that helps keep dry skin hydrated."
            ),
        )

    # --------------------------------------------------
    # DARK SPOTS
    # --------------------------------------------------

    if "Dark spots" in concerns:
        add_focus("Even skin tone")

        add_ingredient(
            "Azelaic Acid",
            "Dark spots",
            (
                "Can help with post-acne marks while also supporting "
                "acne-prone skin."
            ),
        )

        if sensitivity != "High":
            add_ingredient(
                "Vitamin C",
                "Brightening",
                (
                    "Often used in morning routines to support brighter, "
                    "more even-looking skin."
                ),
            )

    # --------------------------------------------------
    # DULLNESS
    # --------------------------------------------------

    if "Dullness" in concerns:
        add_focus("Brightness")

        if sensitivity != "High":
            add_ingredient(
                "Vitamin C",
                "Brightness",
                (
                    "A common antioxidant ingredient used for dullness "
                    "and uneven-looking tone."
                ),
            )

    # --------------------------------------------------
    # REDNESS / RASH / HIGH SENSITIVITY
    # --------------------------------------------------

    irritated_profile = (
        sensitivity == "High"
        or rash_frequency in ["Often", "Very often"]
        or "Redness" in concerns
    )

    if irritated_profile:
        add_focus("Calming irritation")
        add_focus("Barrier support")

        add_ingredient(
            "Ceramides",
            "Barrier",
            (
                "Supports the skin barrier and is often more appropriate "
                "than aggressive active treatments when skin is irritated."
            ),
        )

        add_ingredient(
            "Colloidal Oatmeal",
            "Soothing",
            (
                "A soothing ingredient often used in products designed "
                "for dry, sensitive or irritated skin."
            ),
        )

        # Remove stronger actives if irritation is high
        ingredients = [
            item
            for item in ingredients
            if item["name"]
            not in {
                "Retinol",
                "Benzoyl Peroxide",
            }
        ]

    # --------------------------------------------------
    # MORNING ROUTINE
    # --------------------------------------------------

    morning_support = "Niacinamide"

    if "Dryness" in concerns or skin_type == "Dry":
        morning_support = "Hyaluronic Acid"

    elif (
        "Dark spots" in concerns
        or "Dullness" in concerns
    ) and sensitivity != "High":
        morning_support = "Vitamin C"

    morning = [
        {
            "step": "01",
            "title": "Cleanse",
            "detail": cleanser_detail,
            "ingredient": "Gentle cleanser",
        },
        {
            "step": "02",
            "title": "Support",
            "detail": (
                f"Use a simple {morning_support} product chosen for your "
                "main skin goals. Avoid stacking multiple new actives at once."
            ),
            "ingredient": morning_support,
        },
        {
            "step": "03",
            "title": "Moisturize",
            "detail": moisturizer_detail,
            "ingredient": (
                "Ceramides"
                if skin_type == "Dry"
                or "Dryness" in concerns
                or irritated_profile
                else "Light moisturizer"
            ),
        },
        {
            "step": "04",
            "title": "Protect",
            "detail": (
                "Finish every morning with broad-spectrum sunscreen. "
                "Sun protection is especially important when using "
                "retinoids or treating dark spots."
            ),
            "ingredient": "SPF 30–50+",
        },
    ]

    # --------------------------------------------------
    # EVENING TREATMENT DECISION
    # --------------------------------------------------

    treatment_name = "Niacinamide"
    treatment_detail = (
        "Use a simple barrier-supportive treatment suited to your main concern."
    )

    if irritated_profile:
        treatment_name = "Barrier repair"
        treatment_detail = (
            "Skip aggressive actives while the skin is irritated. "
            "Focus on soothing hydration and barrier support."
        )

    elif acne_selected and acne_frequency in ["Often", "Very often"]:
        treatment_name = "Benzoyl Peroxide"
        treatment_detail = (
            "For frequent pimples, a benzoyl-peroxide treatment may be "
            "appropriate. Introduce gradually because it can be drying."
        )

    elif acne_selected:
        treatment_name = "Salicylic Acid"
        treatment_detail = (
            "For occasional breakouts or congestion, salicylic acid can "
            "help keep pores clear."
        )

    elif "Fine lines" in concerns:
        treatment_name = "Retinol"
        treatment_detail = (
            "Use retinol at night, starting gradually rather than every "
            "night immediately."
        )

    elif "Dark spots" in concerns:
        treatment_name = "Azelaic Acid"
        treatment_detail = (
            "Use an evening treatment aimed at uneven tone and post-acne marks."
        )

    elif "Dryness" in concerns:
        treatment_name = "Hyaluronic Acid"
        treatment_detail = (
            "Prioritize hydration rather than exfoliating or drying treatments."
        )

    evening = [
        {
            "step": "01",
            "title": "Cleanse",
            "detail": (
                "Remove sunscreen, makeup, oil and daily buildup gently."
            ),
            "ingredient": "Gentle cleanser",
        },
        {
            "step": "02",
            "title": "Treat",
            "detail": treatment_detail,
            "ingredient": treatment_name,
        },
        {
            "step": "03",
            "title": "Repair",
            "detail": (
                "Finish with moisturizer to support hydration and overnight "
                "barrier recovery."
            ),
            "ingredient": "Ceramides",
        },
    ]

    # --------------------------------------------------
    # PRODUCT EXAMPLES
    # These change based on the chosen actives.
    # --------------------------------------------------

    if any(
        item["name"] == "Salicylic Acid"
        for item in ingredients
    ):
        products.append(
            {
                "name": "Salicylic Acid Treatment",
                "type": "Acne treatment",
                "actives": "Salicylic Acid",
                "note": (
                    "Look for a beginner-friendly salicylic acid product "
                    "for congestion and clogged pores."
                ),
            }
        )

    if any(
        item["name"] == "Benzoyl Peroxide"
        for item in ingredients
    ):
        products.append(
            {
                "name": "Low-Strength Benzoyl Peroxide Treatment",
                "type": "Breakout treatment",
                "actives": "Benzoyl Peroxide",
                "note": (
                    "For frequent inflammatory pimples, start with a lower "
                    "strength rather than jumping to the strongest option."
                ),
            }
        )

    if any(
        item["name"] == "Retinol"
        for item in ingredients
    ):
        products.append(
            {
                "name": "Beginner Retinol Serum",
                "type": "Night treatment",
                "actives": "Retinol",
                "note": (
                    "Choose a lower-strength beginner formula and introduce "
                    "it gradually."
                ),
            }
        )

    if any(
        item["name"] == "Azelaic Acid"
        for item in ingredients
    ):
        products.append(
            {
                "name": "Azelaic Acid Treatment",
                "type": "Tone + acne support",
                "actives": "Azelaic Acid",
                "note": (
                    "Useful when acne and post-acne dark marks overlap."
                ),
            }
        )

    if (
        skin_type == "Dry"
        or "Dryness" in concerns
    ):
        products.append(
            {
                "name": "Barrier Moisturizer",
                "type": "Moisturizer",
                "actives": "Ceramides + Hyaluronic Acid + Glycerin",
                "note": (
                    "Look for a fragrance-free cream focused on moisture "
                    "retention and barrier support."
                ),
            }
        )

    elif skin_type == "Oily":
        products.append(
            {
                "name": "Lightweight Balancing Moisturizer",
                "type": "Moisturizer",
                "actives": "Niacinamide + Humectants",
                "note": (
                    "Choose lightweight hydration rather than skipping "
                    "moisturizer completely."
                ),
            }
        )

    else:
        products.append(
            {
                "name": "Daily Barrier Moisturizer",
                "type": "Moisturizer",
                "actives": "Ceramides + Humectants",
                "note": (
                    "A simple daily moisturizer helps keep the routine balanced."
                ),
            }
        )

    products.append(
        {
            "name": "Broad-Spectrum Daily Sunscreen",
            "type": "Sunscreen",
            "actives": "SPF 30–50+",
            "note": (
                "Daily sun protection supports every routine, especially "
                "dark-spot and retinoid-based routines."
            ),
        }
    )

    # --------------------------------------------------
    # SAFETY / GUIDANCE
    # --------------------------------------------------

    if irritated_profile:
        sensitivity_note = (
            "Your answers suggest a more reactive skin profile. "
            "Prioritize barrier repair, introduce one product at a time "
            "and avoid stacking strong actives."
        )
    elif sensitivity == "Medium":
        sensitivity_note = (
            "Introduce targeted ingredients gradually and reduce frequency "
            "if burning, persistent redness or irritation develops."
        )
    else:
        sensitivity_note = (
            "Your reported sensitivity is low, but new active ingredients "
            "should still be introduced gradually."
        )

    if sunscreen_use in ["Never", "Rarely"]:
        sunscreen_note = (
            "Improving sunscreen consistency should be a major priority, "
            "especially when treating dark spots or using retinoids."
        )
    else:
        sunscreen_note = (
            "Your sunscreen habit is a strong foundation — keep it consistent."
        )

    if not focus_areas:
        focus_areas.append("Simple daily maintenance")

    profile_summary = (
        f"{skin_type} skin with {sensitivity.lower()} sensitivity. "
        f"Your routine is prioritizing {', '.join(focus_areas).lower()}."
    )

    return {
        "profileSummary": profile_summary,
        "focusAreas": focus_areas,
        "morning": morning,
        "evening": evening,
        "ingredients": ingredients,
        "products": products,
        "sensitivityNote": sensitivity_note,
        "sunscreenNote": sunscreen_note,
    }