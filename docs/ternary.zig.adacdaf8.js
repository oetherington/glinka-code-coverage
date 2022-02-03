var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   22","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   23","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   24","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   25","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   26","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   27","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub fn inferTernaryType(","class":"lineCov","hits":"1","order":"5031","possible_hits":"1",},
{"lineNum":"   30","line":"    cmp: *Compiler,"},
{"lineNum":"   31","line":"    nd: node.Node,"},
{"lineNum":"   32","line":"    ctx: *const InferContext,"},
{"lineNum":"   33","line":"    trn: node.Ternary,"},
{"lineNum":"   34","line":") InferResult {"},
{"lineNum":"   35","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"5032","possible_hits":"1",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    _ = switch (inferExprType(cmp, trn.cond, &subCtx)) {","class":"linePartCov","hits":"2","order":"5033","possible_hits":"3",},
{"lineNum":"   38","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"5034","possible_hits":"1",},
{"lineNum":"   39","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    };"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    const ifT = switch (inferExprType(cmp, trn.ifTrue, &subCtx)) {","class":"linePartCov","hits":"1","order":"5035","possible_hits":"2",},
{"lineNum":"   43","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"5036","possible_hits":"1",},
{"lineNum":"   44","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"    };"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    const ifF = switch (inferExprType(cmp, trn.ifFalse, &subCtx)) {","class":"linePartCov","hits":"1","order":"5037","possible_hits":"2",},
{"lineNum":"   48","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"5038","possible_hits":"1",},
{"lineNum":"   49","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    };"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    nd.ty = if (ifT == ifF)","class":"lineCov","hits":"2","order":"5039","possible_hits":"2",},
{"lineNum":"   53","line":"        ifT","class":"lineCov","hits":"1","order":"5040","possible_hits":"1",},
{"lineNum":"   54","line":"    else"},
{"lineNum":"   55","line":"        cmp.typebook.getUnion(&.{ ifT, ifF });","class":"lineCov","hits":"1","order":"6729","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    return InferResult.success(nd.ty.?);","class":"lineCov","hits":"1","order":"5041","possible_hits":"1",},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"test \"can infer type of a homogeneous ternary expression\" {","class":"lineCov","hits":"3","order":"6707","possible_hits":"3",},
{"lineNum":"   61","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   62","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6708","possible_hits":"1",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    const cond = node.makeNode(alloc, csr, .True, {});","class":"lineCov","hits":"1","order":"6709","possible_hits":"1",},
{"lineNum":"   65","line":"    const ifTrue = node.makeNode(alloc, csr, .Int, \"1\");","class":"lineCov","hits":"1","order":"6710","possible_hits":"1",},
{"lineNum":"   66","line":"    const ifFalse = node.makeNode(alloc, csr, .Int, \"2\");","class":"lineCov","hits":"1","order":"6711","possible_hits":"1",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    defer alloc.destroy(cond);","class":"linePartCov","hits":"1","order":"6719","possible_hits":"2",},
{"lineNum":"   69","line":"    defer alloc.destroy(ifTrue);","class":"linePartCov","hits":"1","order":"6718","possible_hits":"2",},
{"lineNum":"   70","line":"    defer alloc.destroy(ifFalse);","class":"linePartCov","hits":"1","order":"6717","possible_hits":"2",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6716","possible_hits":"2",},
{"lineNum":"   73","line":"        .expectedTy = .Number,"},
{"lineNum":"   74","line":"    }).run(.Ternary, node.Ternary{","class":"lineCov","hits":"1","order":"6715","possible_hits":"1",},
{"lineNum":"   75","line":"        .cond = cond,","class":"lineCov","hits":"1","order":"6712","possible_hits":"1",},
{"lineNum":"   76","line":"        .ifTrue = ifTrue,","class":"lineCov","hits":"1","order":"6713","possible_hits":"1",},
{"lineNum":"   77","line":"        .ifFalse = ifFalse,","class":"lineCov","hits":"1","order":"6714","possible_hits":"1",},
{"lineNum":"   78","line":"    });"},
{"lineNum":"   79","line":"}"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"test \"can infer type of a non-homogeneous ternary expression\" {","class":"lineCov","hits":"3","order":"6720","possible_hits":"3",},
{"lineNum":"   82","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   83","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6721","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    const cond = node.makeNode(alloc, csr, .True, {});","class":"lineCov","hits":"1","order":"6722","possible_hits":"1",},
{"lineNum":"   86","line":"    const ifTrue = node.makeNode(alloc, csr, .Int, \"1\");","class":"lineCov","hits":"1","order":"6723","possible_hits":"1",},
{"lineNum":"   87","line":"    const ifFalse = node.makeNode(alloc, csr, .String, \"\'hello world\'\");","class":"lineCov","hits":"1","order":"6724","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    defer alloc.destroy(cond);","class":"linePartCov","hits":"1","order":"6742","possible_hits":"2",},
{"lineNum":"   90","line":"    defer alloc.destroy(ifTrue);","class":"linePartCov","hits":"1","order":"6741","possible_hits":"2",},
{"lineNum":"   91","line":"    defer alloc.destroy(ifFalse);","class":"linePartCov","hits":"1","order":"6740","possible_hits":"2",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6739","possible_hits":"2",},
{"lineNum":"   94","line":"        .check = (struct {"},
{"lineNum":"   95","line":"            fn check(","class":"lineCov","hits":"1","order":"6731","possible_hits":"1",},
{"lineNum":"   96","line":"                scope: *Scope,"},
{"lineNum":"   97","line":"                typebook: *TypeBook,"},
{"lineNum":"   98","line":"                res: InferResult,"},
{"lineNum":"   99","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6738","possible_hits":"1",},
{"lineNum":"  100","line":"                _ = scope;"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"                const expectedTy = typebook.getUnion(&.{","class":"lineCov","hits":"2","order":"6732","possible_hits":"2",},
{"lineNum":"  103","line":"                    typebook.getNumber(),","class":"lineCov","hits":"1","order":"6733","possible_hits":"1",},
{"lineNum":"  104","line":"                    typebook.getString(),","class":"lineCov","hits":"1","order":"6734","possible_hits":"1",},
{"lineNum":"  105","line":"                });"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"                try std.testing.expectEqual(","class":"lineCov","hits":"1","order":"6736","possible_hits":"1",},
{"lineNum":"  108","line":"                    InferResult.Variant.Success,"},
{"lineNum":"  109","line":"                    res.getType(),","class":"lineCov","hits":"1","order":"6735","possible_hits":"1",},
{"lineNum":"  110","line":"                );"},
{"lineNum":"  111","line":"                try std.testing.expectEqual(expectedTy, res.Success);","class":"lineCov","hits":"2","order":"6737","possible_hits":"2",},
{"lineNum":"  112","line":"            }"},
{"lineNum":"  113","line":"        }).check,"},
{"lineNum":"  114","line":"    }).run(.Ternary, node.Ternary{","class":"lineCov","hits":"1","order":"6728","possible_hits":"1",},
{"lineNum":"  115","line":"        .cond = cond,","class":"lineCov","hits":"1","order":"6725","possible_hits":"1",},
{"lineNum":"  116","line":"        .ifTrue = ifTrue,","class":"lineCov","hits":"1","order":"6726","possible_hits":"1",},
{"lineNum":"  117","line":"        .ifFalse = ifFalse,","class":"lineCov","hits":"1","order":"6727","possible_hits":"1",},
{"lineNum":"  118","line":"    });"},
{"lineNum":"  119","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 08:56:39", "instrumented" : 49, "covered" : 46,};
var merged_data = [];
