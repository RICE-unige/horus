<p align="center">
  <img src="imgs/horus_logo_black.svg#gh-light-mode-only" alt="HORUS logo" height="90">
  <img src="imgs/horus_logo_white.svg#gh-dark-mode-only" alt="HORUS logo" height="90">
</p>

<p align="center"><em>Holistic Operational Reality for Unified Systems</em></p>

[![License](https://img.shields.io/badge/License-Apache--2.0-green.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-Meta%20Quest%203-brightgreen)
![Focus](https://img.shields.io/badge/Focus-Research%20Release%20Channel-blue)

> This repository is the research-facing release channel for HORUS.
> It packages the project narrative, release-facing documentation, and website assets while active implementation evolves across the source repositories.

## Overview

HORUS (Holistic Operational Reality for Unified Systems) is a mixed-reality interface for managing heterogeneous mobile robot teams and teleoperating individual member of the team. The current platform targets Meta Quest 3 and is designed around a workspace-centered operational workflow for real-world robot management, not only lab visualization.

This repository is intentionally documentation- and research-oriented:
- release channel for the HORUS application,
- project website assets and top-level narrative,
- high-level onboarding for researchers, reviewers, and collaborators.

## Repository Role in the HORUS Stack

The active implementation is split across three source repositories:
- `horus` - Meta Quest MR runtime (Unity application)
- `horus_sdk` - SDK, registration payloads, examples, and dashboard tooling
- `horus_ros2` - ROS 2 bridge/runtime infrastructure (TCP/WebRTC)

This repository (`horus_research`) complements them by presenting the release-facing view of the project and research direction.

## Current Platform Baseline (as of current mainline)

The HORUS stack currently supports a functional multi-robot MR workflow with the following implemented baselines:

- Workspace-gated robot registration and activation in MR.
- Multi-robot camera visualization and teleoperation flows.
- Teleoperation modes including minimap and immersive camera-assisted operation.
- 2D tasking baseline:
  - Go-to-point
  - Waypoint authoring/execution
  - Label Pose authoring
  - Go-to-labeled navigation flow integration
- Sensor and map visualization baseline:
  - Camera
  - LaserScan
  - PointCloud
  - Occupancy map (global visualization path)
- DataViz control foundation in Robot Manager for supported channels (with explicit start/stop and unsubscribe behavior).
- Stereo camera pipeline support for immersive teleoperation (with minimap kept mono by design).
- WebRTC runtime/bridge recovery hardening for more reliable teleop streaming.

## Research Direction and Future Goals

HORUS is being developed as a research platform for scalable mixed-reality robot operations. The next major lines of work include:

- Multi-operator collaboration (shared session state, ownership, arbitration, conflict handling)
- AI copilot assistance for supervision and mission support
- Expanded tasking workflows (multi-robot coordinated tasking, richer semantic actions)
- 3D map and advanced scene representations for spatial understanding
- Persistent mission objects (labels, pins, evidence, operator annotations)
- Session recording and after-action replay
- Adaptive streaming and resource-aware transport policies
- Semantic perception overlays and risk-aware operator guidance
- Manipulator and mobile-manipulator operational workflows

The emphasis is on experimentally grounded design decisions that can be validated in realistic multi-robot scenarios.

## System Architecture (High Level)

```text
horus_sdk (registration + orchestration + dashboard)
        <->
horus_ros2 / horus_unity_bridge (ROS2 TCP/WebRTC bridge)
        <->
HORUS MR App (Meta Quest runtime, Unity)
```

## Releases and Installation

For application releases, use the APK packages published in the Releases section of this repository:
- https://github.com/RICE-unige/horus/releases
- Latest reusable release (`v0.2.0`): https://github.com/RICE-unige/horus/releases/tag/v0.2.0

Typical deployment flow:
1. Install the HORUS APK on Meta Quest 3.
2. Set up the backend stack (`horus_sdk` + `horus_ros2`) on the operator laptop.
3. Connect headset and backend on the same reachable network.
4. Launch the bridge, register robots, and accept the workspace in MR.

For backend/source setup, follow the source repositories:
- SDK + installer: https://github.com/RICE-unige/horus_sdk
- ROS 2 bridge runtime: https://github.com/RICE-unige/horus_ros2
- MR runtime source (Unity): https://github.com/Omotoye/horus

## Practical Validation Workflows (Current)

The current recommended validation path uses the SDK fake runtime and registration demos:

- Unified fake runtime (TF + camera + teleop + tasks, no occupancy in all-in-one ops test)
- Typical SDK registration demo for multi-robot workflows
- Stereo camera demo pair for immersive teleop validation (SBS or dual-topic)

These workflows are documented in detail in `horus_sdk/README.md` and tracked against the current runtime behavior in `horus/README.md`.

## Project Website

- Project website: https://rice-unige.github.io/horus/

## Roadmap Framing

HORUS development follows a staged research roadmap:
- establish a robust MR supervision and teleoperation baseline,
- expand heterogeneous tasking and data visualization depth,
- scale to multi-operator and copilot-assisted operations,
- validate through structured experiments and publish reproducible findings.

## Citation

If you use HORUS or ideas from this work in your research, please cite:

O. S. Adekoya, A. Sgorbissa, C. T. Recchiuto. *HORUS: A Mixed Reality Interface for Managing Teams of Mobile Robots*. arXiv preprint arXiv:2506.02622, 2025.

```bibtex
@misc{adekoya2025horus,
  title         = {HORUS: A Mixed Reality Interface for Managing Teams of Mobile Robots},
  author        = {Adekoya, Omotoye Shamsudeen and Sgorbissa, Antonio and Recchiuto, Carmine Tommaso},
  year          = {2025},
  eprint        = {2506.02622},
  archivePrefix = {arXiv},
  primaryClass  = {cs.RO},
  url           = {https://github.com/RICE-unige/horus},
  pdf           = {https://arxiv.org/abs/2506.02622},
  note          = {arXiv preprint arXiv:2506.02622}
}
```

## Contact

- Omotoye Shamsudeen Adekoya
- Email: `omotoye.adekoya@edu.unige.it`

## Acknowledgments

This project is part of a PhD research effort at the University of Genoa, under the supervision of:
- Prof. Carmine Recchiuto
- Prof. Antonio Sgorbissa

Developed at [RICE Lab](https://rice.dibris.unige.it/), [University of Genoa](https://unige.it/en).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). For research-facing updates, prioritize:
- clear scope and motivation,
- reproducible validation steps,
- explicit relation to current platform baseline or roadmap goals.

## License

Apache-2.0. See [`LICENSE`](LICENSE).
