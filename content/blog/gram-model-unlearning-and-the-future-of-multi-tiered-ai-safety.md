---
title: "GRAM, model unlearning, and the future of multi-tiered AI safety"
date: "2026-07-19"
description: "GRAM makes knowledge permissions physical, but production AI safety will need several independent layers whose blind spots do not align."
tags: ["AI", "AI Safety", "AI Alignment", "Anthropic"]
coverImage: "/images/gram-model-unlearning-cover.png"
coverImageAlt: "A modular neural network protected by concentric safety layers, with one knowledge module detached."
coverImageCredit: "Created with OpenAI's GPT Image 2 model."
---

Funemployment has been rather intellectually fun, and I suddenly have time to revisit the nerdy side of my life and to go deep on the latest technical developments.

Over the weekend, I came across [GRAM on Anthropic’s Alignment Science blog](https://alignment.anthropic.com/2026/modular-pretraining/).

Today, many AI safeguards sit around the model rather than changing what it knows inherently. This is understandable, given the scalability issues surrounding having to train bespoke models that omit particular domains of knowledge. Instead, we might fine-tune it to refuse certain request domains, or run [classifiers over prompts and responses](https://www.anthropic.com/research/next-generation-constitutional-classifiers). But we have not been able to escape the reality that the underlying knowledge are still mixed into the model’s weights.

GRAM (Gradient-Routed Auxiliary Modules) tries to change that during pre-training itself. In a nutshell, data from specific domains is “pushed” towards dedicated neural modules. So if a deployment should not have access to advanced virology knowledge, for example, the corresponding module can be left out.

## How GRAM works technically

Each block in a Transformer contains an MLP, an essentially [GRAM widens those MLPs](https://alignment.anthropic.com/2026/modular-pretraining/#the-method) by adding small groups of extra neurons: a shared core plus one auxiliary module for each controlled domain.

When the model trains on let’s say a batch of virology data, both the shared core weights and the virology module participate in the forward pass. During backpropagation, the virology module is always updated, while the shared core only receives the gradient update some of the time, controlled by a tunable hyperparameter called** **auxiliary spread**, **and can sometimes be frozen entirely. This makes the domain specialist module the most direct place for virology-specific learning to accumulate without preventing the model from using general knowledge to understand the text.

On ordinary core data, the shared weights train normally, and GRAM occasionally activates an auxiliary module too, so that switching modules on later does not disrupt general behaviour. At inference time, the provider can omit or delete a module to create a different capability profile. So GRAM is not routing tokens to different experts, but it is routing where the learning signal is allowed to write, and that differentiation is what makes the modules potentially removable.

The results are promising: across experiments for models from 50M to 5B parameters, the [GRAM paper](https://arxiv.org/abs/2607.08077) reports that its models were consistent with separately trained models with the relevant data filtered out. The “removed” knowledge was also harder to recover with limited fine-tuning attacks than with the post-hoc unlearning baseline.

How does it fare with other methods like optimised LoRA? Using optimised LoRA, you first train a shared base model with the sensitive domains filtered out, then you iteratively add each domain back through a small specialist adapter. In experiments, this seemed to work about as well as GRAM. But the potential advantage of GRAM appears when the system becomes more complicated. LoRA’s adapters are trained separately after pre-training, so enabling several at once can cause them to interfere in ways that we don’t expect. On the other hand, GRAM’s modules are learned jointly together during the original training run. In follow-up experiments, GRAM appeared to [combine several capabilities more cleanly](https://alignment.anthropic.com/2026/modular-pretraining/#composability) and isolated them better when half the training labels were missing. So it seems that these are good reasons for the research field to keep exploring GRAM, though the researchers are clear that the experiments do not yet prove a general advantage over LoRA.

## The physicality of AI models

Most AI safety discussions these days are about post-training behaviour. The discussions essentially revolve around safeguards to determine if a particular model should answer the question, refuse it, or give some form of a safer, conservative option. And so the really interesting part of GRAM is that it makes a safety policy physically visible in the architecture itself, to whatever extent you agree that these language model architectures are physical. Certain gradients are allowed to write to certain modules, and those modules can later be included or removed based on access demands.

And to me that’s so much more interesting than just another layer of prompt filtering, because it suggests that model architecture itself can actually become a part of wider access control. It also challenges the common notion that language models are a complete black-box (though researchers in the field have been trying to crack away at this opacity for the past few years). But there are also quite a few limitations of going down this path.

## You can’t label every kind of risk

The GRAM approach still requires us to decide which kinds of knowledge need their own modules before training. One of the results was that when only half of the training data was labelled, GRAM [isolated capabilities better than filtering or LoRA](https://alignment.anthropic.com/2026/modular-pretraining/#isolation-under-partial-labeling). So it seems to suggest that every relevant example may not need to be identified perfectly. But the researchers still chose the categories beforehand (e.g. virology, cybersecurity, nuclear physics), and handling incomplete labels is not the same as discovering risks that nobody has anticipated yet.

The other problem is that fields like virology, for example, overlaps with medicine, chemistry, statistics etc. So a dangerous result might still come up from combining knowledge across these others fields (given how language models have intellectual capability of solving mathematical proofs that no one has solved yet), even if none of those components looks dangerous by itself. Conversely, if you are too conservative in the ways you label the potential overlaps, you risk losing more generic knowledge for non-malignant purposes too.

The reality is that we will not anticipate every risk category: new capabilities will emerge, and users will find new ways to jailbreak or combine harmless-looking pieces. So I do not think GRAM is a scalable answer on its own, but nonetheless it is a useful layer for known and reasonably separable domains.

## Can an LLM really unlearn something?

There is a difference between making a model refuse an answer, making the answer harder to recover, and actually removing the underlying knowledge. Most [post-hoc unlearning methods](https://arxiv.org/abs/2601.13264) are closer to suppression than a guarantee of erased knowledge, and so a model can fail an expected test but still reveal the same knowledge through paraphrasing or a different task / context, or after some fine-tuning. In the GRAM experiments, the [MaxEnt baseline recovered close to the all-data model after fine-tuning](https://alignment.anthropic.com/2026/modular-pretraining/#access-control-on-real-dual-use-data).

GRAM is stronger in one sense because it plans for removal before the knowledge spreads through a conventional model. The target data is “written” into parameters that can later be removed, rather than asking a fully trained model to suppress what it already knows, which we all know is terribly unreliable. So removing a module directly changes the computations available to the model, not just the runtime instructions or response style / guardrails.

But a capability is not like a self-contained .md file, and the remaining weights may still infer parts of it from allowed knowledge, learn from another source, or reacquire it during later fine-tuning. GRAM’s own authors leave these as open questions, especially regarding the issues of entangled capabilities and downstream instruction tuning ([see their discussion](https://alignment.anthropic.com/2026/modular-pretraining/#discussion)).

This makes me think the real design ideal is not perfect “unlearning”, but revocability. There are three enabling parts to it:

- A capability should be reversible, meaning we should be able to remove knowledge without retraining the whole model and that this removal stays very difficult to recover (Note I say difficult but not impossible because I think the ROI to getting to complete removal is quickly diminishing).
- A capability should be traceable, meaning we can identify which data, modules and training stages contributed to it (I believe most AI labs should already have some level of this, but it should probably be taken more seriously as model versions themselves begin to proliferate and the downstream production requirements evolve).
- A capability should be governable, meaning the relevant knowledge modules can be versioned, tested across various contexts, user personas, and if possible, granted only to authorised users or deployments.

And we’re still some way away from this, because it’s a much larger systems problem than just editing / removing weights. The folks who design and train the architecture now have to also think about data provenance, access control and adversarial evaluation right from the get-go. GRAM would thus be just one primitive in this larger system, and so research and deployment engineering would need to have greater collaboration across.

## Intent still matters

It should be clear by now that perfect knowledge separation won’t be able to solve the larger problem.

The same cybersecurity or virology knowledge can support legitimate research or real harm. And whether it should be available depends on the user’s request, the conversation leading up to it, the user’s role, the tools allowed, and the level of detail being requested. I think models will need to become a lot more capable in inferring intent across the whole interaction, and not just attempt to classify each prompt in isolation. There’s been some work in this regard - see some recent work on [multi-turn intent detection](https://arxiv.org/abs/2605.05630) that could be a sign that we’re moving in this direction.

Relevant history across conversations might also help, and that’s something AI labs could consider. OpenAI has already described [narrow, time-limited safety summaries for rare high-risk situations](https://openai.com/index/chatgpt-recognize-context-in-sensitive-conversations/), but this is also where some would worry about safety quickly becoming surveillance.

Coming from a fraud background myself, a single transaction is often not enough to tell you much, and the useful signal comes from all the patterns around it. In an AI product like Codex, that might include the frequency and timing of sessions, whether the user’s stated purpose remains consistent, whether requests become progressively more operational, whether there are repeated attempts to rephrase a blocked request, whether there are mismatches between the capability requested and the user’s inferred role, whether there are sudden inflections in language and tone. Of course, none of these proves malicious intent on its own, because even tone is culturally and contextually noisy. The value comes from combining weak signals and looking for meaningful deviation, and then having tiered levels of intervention to target different kinds of risks at different severity levels.

In the transactional space, fraud might involve sudden transaction velocity, new devices or unusual account behaviour. In the language model space, abuse might appear as a progression from general questions to target-specific exploitation, for example. I believe that everyone is more habitual than they imagine themselves to be.

Mental-health risk, violent-extremism risk and other sensitive domains will have their own patterns, false-positive costs and appropriate interventions. And so we might need to avoid just having a single universal risk score that would flatten all these differences and probably cause other kinds of problems or inconvenience. For the domains that matter most to us, each domain needs its own defined signals, thresholds, evaluation data and escalation policy.

A separate policy or system design could also calculate aggregated, time-bound and auditable risk signals, then tell the model only what it needs for the current decision on whether to reduce detail, request verification, restrict a tool usage, or escalate for review. Ideally, the system should also record which signals affected the decision so that it can be audited and challenged.

So for example, a lack of history could therefore signal uncertainty, and a long benign history should also not become a permanent trust signal either. Everything can be artificially constructed, and attackers are really good at reverse engineering normal-looking behaviour. Ultimately, behavioural history and metadata should still be one layer of evidence within a more robust risk decision engine.

## Where I think this is headed

Most adopters of AI safety in production still view safety in rather siloed, narrow, generalised terms, rather than designing in a multi-tiered way. It shows up in the way we test for it too. Instead, we should be thinking about all these capabilities working together to give us the best chance of using AI in a safe way:

- Knowledge compartmentalisation for known capabilities (e.g. GRAM)
- Post-training to infer contextual behavioural signals
- Stateful inference of intent beyond the current session
- Identity and role-based access, controls for tools based on risk levels
- Classifiers, monitors and tests to adversarially test risky scenarios

If you treat AI as a big system within your team’s own big system, the important thing is that the blind spots do not all line up to expose usage vulnerabilities. Each part of the system needs enough independent coverage so that a new path of abuse is likely to hit at least one control.

And GRAM is interesting because it gives one of those controls a “physical” form, and its limitations are also precisely why we will need the other controls.
