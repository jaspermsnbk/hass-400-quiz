import json

QUIZ_TITLE = "Extremist and Cult Leader Commonality Quiz"
CONFIG = "config/leader-config.txt"
OUT_QUIZ = f"public/assets/{QUIZ_TITLE.replace(' ', '-')}.json"
OUT_LEADERS = ""


def main():
    lines = []
    with open(CONFIG, "r") as f:
        lines = f.readlines()
    # print(lines)
    leaderMap = {}
    leaders = []
    RawleaderScores = {}
    leaderScores = {}
    categories = []
    rawQuiz = {}
    context = ""
    leaderContext = ""
    for i, l in enumerate(lines):
        l = l.strip()

        if len(l) == 0 or l.startswith("#"):
            continue
        elif l.startswith("end"):
            context = ""
            continue
        elif l.startswith("leaders"):
            context = "leaders"
            continue
        elif l.startswith("categories"):
            context = "categories"
            continue
        elif l.startswith("yn categories"):
            context = "yn categories"
            continue
        else:
            # print(i, context)
            match (context):
                case "leaders":
                    if l.startswith("-"):
                        temp = l.split("-")

                        abr = temp[1].strip()
                        name = temp[2].strip()

                        leaders.append(name)
                        leaderMap[abr] = name
                        RawleaderScores[name] = set()
                    elif l.startswith("blurb:"):
                        leaderContext = "blurb"
                    elif l.startswith("picture href:"):
                        leaderContext = "picture href:"                        
                    elif l.startswith("sources:"):
                        leaderContext = "sources:"
                    else:
                        match(leaderContext):
                            case "blurb":
                                pass
                            case "picture href:":
                                pass
                            case "sources:":
                                pass
                case "yn categories":
                    pass
                case "categories":
                    if l.startswith("-"):
                        cat = categories[len(categories) - 1]
                        if cat in rawQuiz:
                            rawQuiz[cat].append(l[1:].strip())
                        else:
                            rawQuiz[cat] = [l[1:].strip()]
                    elif l.startswith("%"):
                        cat = categories[len(categories) - 1]
                        # print(l)
                        for abr in l[1:].strip().split(" "):
                            abr = abr.strip()
                            if abr in leaderMap:
                                # print(abr)
                                # print(leaderMap[abr])
                                RawleaderScores[leaderMap[abr]].add(cat)
                            else:
                                print(f"Unrecognized Abrev {abr}, skipping...")
                    else:
                        categories.append(l)

    # post processing

    for k in RawleaderScores.keys():
        temp = []
        rs = RawleaderScores[k]

        for cat in categories:
            score = 1 if cat in rs else 0
            temp.append({
                "title":cat,
                "score":score,
                "maxScore":1
            })

        leaderScores[k] = temp

    quiz = {"title": QUIZ_TITLE, "categories": []}
    qcount = 0
    for cat in rawQuiz.keys():
        tc = {"title": cat, "questions": []}
        for q in rawQuiz[cat]:
            tq = {
                "title": q,
                "alpha": 1,
            }
            qcount += 1
            tc["questions"].append(tq)

        quiz["categories"].append(tc)
    print("total questions: ", qcount)
    # print(leaderScores)
    # print(rawQuiz)
    # print(quiz)

    print(leaders)
    # print(categories)
    # for cat in categories:
    #     print(cat, quiz[cat])
    # print(RawleaderScores)
    # print(leaderMap)
    # print(leaders)
    with open(OUT_QUIZ, "w") as out_quiz:
        json.dump(quiz, out_quiz)


main()
