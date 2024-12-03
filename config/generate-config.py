import json

QUIZ_TITLE = "Extremist and Cult Leader Commonality Quiz"
CONFIG = "config/leader-config.txt"
OUT_QUIZ = f"public/assets/{QUIZ_TITLE.replace(' ', '-')}.json"
OUT_LEADERS = "public/assets/leaders.json"


def main():
    lines = []
    with open(CONFIG, "r") as f:
        lines = f.readlines()
    # print(lines)
    leaderMap = {}
    leaders = []
    leadersObj = {}
    RawleaderScores = {}
    leaderScores = {}
    categories = []
    yncategories = []
    rawQuiz = {}
    rawQuizYN = {}
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
                        leadersObj[name] = {
                            "blurb": [],
                            "picture": "",
                            "sources": [],
                        }
                    elif l.startswith("blurb:"):
                        leaderContext = "blurb"
                    elif l.startswith("picture href:"):
                        leaderContext = "picture href:"
                    elif l.startswith("sources:"):
                        leaderContext = "sources:"
                    else:
                        leader = leaders[len(leaders) - 1]
                        match (leaderContext):
                            case "blurb":
                                leadersObj[leader]["blurb"].append(l)
                            case "picture href:":
                                leadersObj[leader]["picture"] = l
                            case "sources:":
                                leadersObj[leader]["sources"].append(l)
                case "yn categories":
                    if l.startswith("-"):
                        cat = yncategories[len(yncategories) - 1]
                        if cat in rawQuizYN:
                            rawQuizYN[cat].append(l[1:].strip())
                        else:
                            rawQuizYN[cat] = [l[1:].strip()]
                    elif l.startswith("%"):
                        cat = yncategories[len(yncategories) - 1]
                        for abr in l[1:].strip().split(" "):
                            abr = abr.strip()
                            if abr in leaderMap:
                                RawleaderScores[leaderMap[abr]].add(cat)
                            else:
                                print(f"Unrecognized Abrev {abr}, skipping...")
                    else:
                        yncategories.append(l)
                case "categories":
                    if l.startswith("-"):
                        cat = categories[len(categories) - 1]
                        if cat in rawQuiz:
                            rawQuiz[cat].append(l[1:].strip())
                        else:
                            rawQuiz[cat] = [l[1:].strip()]
                    elif l.startswith("%"):
                        cat = categories[len(categories) - 1]
                        for abr in l[1:].strip().split(" "):
                            abr = abr.strip()
                            if abr in leaderMap:
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
            temp.append({"title": cat, "score": score, "maxScore": 1})

        leaderScores[k] = temp

    leaderOutArr = []
    for l in leaderScores.keys():
        temp = leadersObj[l]
        # print(l)
        temp["name"] = l
        # temp["blurb"] = "\n".join(temp["blurb"])
        # temp["blurb"] = ""
        temp["resVect"] = {"details": leaderScores[l], "basic": []}
        leaderOutArr.append(temp)

    # print(leaderOutArr)
    ynqcount = 0

    quiz = {"title": QUIZ_TITLE, "categories": []}
    qcount = 0
    for cat in rawQuiz.keys():
        tc = {"title": cat, "questions": []}
        for q in rawQuiz[cat]:
            tq = {"title": q, "alpha": 1, "type": "reg"}
            qcount += 1
            tc["questions"].append(tq)

        quiz["categories"].append(tc)

    for yncat in rawQuizYN.keys():
        tc = {"title": yncat, "questions": []}
        for q in rawQuizYN[yncat]:
            tq = {"title": q, "alpha": 1, "type": "tf"}
            ynqcount += 1
            tc["questions"].append(tq)

        quiz["categories"].append(tc)

    print("total leaders: ", len(leaders))
    print("total categories: ", len(categories))
    print("total yn questions: ", ynqcount)
    print("total reg questions: ", qcount)
    # print(leaderScores)
    # print(rawQuiz)
    # print(quiz)
    # print(leadersObj)
    # print(leaders)
    # print(categories)
    # for cat in categories:
    #     print(cat, quiz[cat])
    # print(RawleaderScores)
    # print(leaderMap)
    # print(leaders)
    with open(OUT_QUIZ, "w") as out_quiz:
        json.dump(quiz, out_quiz)

    with open(OUT_LEADERS, "w") as out_leaders:
        json.dump(leaderOutArr, out_leaders)


main()
